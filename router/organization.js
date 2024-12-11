const express = require('express')
const router = express.Router()
const Organization = require('../controller/organization')
const Customer = require('../controller/customer')
const Agent = require('../controller/agent')
const authorization = require('../function/auth')
const uploadfile = require('../function/s3/upload_file')
const { sign, attestation } = require('../function/signature')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const Agent_ = require('../schema/agent')
const labelRateLimiter = require('../rate_limiter/labels')
const { urlencoded } = require('body-parser')
const Environment = require('../controller/environment')
const { setChannel, sendToQueue, ack, nack } = require('../rabbitmq/channel')

const organization = new Organization()
const agent = new Agent()
const customer = new Customer()
const environment = new Environment()

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/create', async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
	  const { workspace, organization_name, email, password, whatsapp_number } = req.body;
  
	if(workspace){ const existingOrganization = await organization.isExisting({ workspace });
	// console.log("isExisting","1111111111111111");
	if (existingOrganization) {
	  return res.status(400).json({
		success: false,
		message: 'Workspace already exists',
	  });
	}}
	 
  if(email){ const existingEmail = await agent.isExisting({ email });
//   console.log("existingEmail","2222222222222222222222");
  if (existingEmail) {
	return res.status(400).json({
	  success: false,
	  message: 'Email already exists',
	});
  }}
	 
  
	  // Create new organization
	  const organizationCreate = await organization.create({
		organization_name,
		workspace,
		whatsapp_number,
		session,
	  });
  
	//   console.log("organizationCreate",organizationCreate);
	  // Add new agent
	  const agentData = await agent.add({
		name: organization_name, // Use organization_name here
		email,
		password,
		workspace,
		role: 'SUPERADMIN',
		session,
	  });
  
	//   console.log("agentData",agentData);
	  // Initialize preferences
	  await environment.initPreference({ workspace });
  
	  // Add new customer
	  const addedCustomer = await customer.add({
		workspace,
		name: organization_name,
		email,
		phone_number:whatsapp_number,
		password,
		labels: 'REGISTER',
	  });
       
	  const customerData = {
		workspace: addedCustomer.workspace,
		name: addedCustomer.name,
		display_name: addedCustomer.name,
		email: addedCustomer.email,
		password: addedCustomer.password,
		phone_number: addedCustomer.phone_number,
	
	  };
  
	//   console.log("Customer added successfully:", customerData);
    //  console.log("query end ");
	  // Commit transaction
	  await session.commitTransaction();
	  session.endSession();
  
	  // Send messages to the queue
	  sendToQueue('account_center', 'SERVICE_MAIL', {
		service: 'ORGANIZATION_CREATE',
		agent: agentData,
	  });
	  sendToQueue('inderact', 'CUSTOMER_CREATE',customerData);
  
	  // Respond with success message
	  res.status(200).json({
		success: true,
		message: 'Organization created successfully',
		data: organizationCreate,
	  });
	} catch (error) {
	  // Abort transaction on error
	  await session.abortTransaction();
	  session.endSession();
	  next(error);
	}
  });

router.post('/info', attestation, authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace

		const list_organization = await organization.info({ workspace })

		res.status(200).json({
			success: true,
			message: ' Listed successfully ',
			data: list_organization,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

// router.post('/create', async (req, res,next) => {
// 	console.log(req.body)
// 	try {
// 		const {workspace,billing_details} = req.body

// 		const existingOrganization = await masfob.exitingWorkspace({workspace})
// 		if (existingOrganization) {
// 			return res.status(400).json({ error: 'workspace already exists' })
// 		}

// 		// const organizationData = {
// 		// 	organization_name: req.body.organization_name,
// 		// 	workspace: workspace,
// 		// }
// 		// const Agentdata = {
// 		// 	name: req.body.agent_name,
// 		// 	email: req.body.email,
// 		// 	password: req.body.password,
// 		// 	workspace: workspace,
// 		// 	role: 'SUPERADMIN',
// 		// }
// 		const result = await masfob.createOrganization({
// 			organization_name: req.body.organization_name,
// 			workspace: workspace,
// 		})
// 		const adentcreate = await masfob.agentAdd({
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: req.body.password,
// 			workspace: workspace,
// 			role: 'SUPERADMIN',
// 			billing_details:billing_details
// 		},{new:true})

// 		res.status(200).json({
// 			success: true,
// 			message: 'Organization Created successfully ',
// 			data: result.result,
// 		})	} catch (error) {
// 		// console.error(error)
// 		// res.status(500).json({ error: 'Internal Server Error' })
// 		next(error)
// 	}
// })

//list route changed to fetch
router.get('/fetch', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const organization_fetch = await organization.fetch({ workspace })

		organization_fetch.email = req.email

		res.status(200).json({
			success: true,
			message: 'Organization fetched successfully ',
			data: organization_fetch,
		})
	} catch (error) {
		// console.error(error);
		// res.status(500).json({ error: 'Internal Server Error' });
		next(error)
	}
})

// router.post('/update', authorization, async (req, res,next) => {
// 	console.log(req.body)
// 	try {
// 		//check the data i have removed the workspace
// 		const newData = {
// 			organization_name: req.body.organization_name,
// 			logo: req.body.logo,
// 			billing_details: JSON.parse(req.body.billing_details),
// 			tags: req.body.tags,
// 		}

// 		//test the query
// 		const result = await organization.updateOrganization(workspace, newData)

// 		res.status(200).json({
// 			success: true,
// 			message: 'Organization updated successfully ',
// 			data: result,
// 		})	} catch (error) {
// 		console.error(error)

// 		if (error.message === 'Organization not found or not modified') {
// 			res.status(404).json({ error: 'Organization not found or not modified' })
// 		} else {
// 			// res.status(500).json({ error: 'Internal Server Error' })
// 			next(error)
// 		}
// 	}
// })
router.post('/name/update', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const organization_name = req.body.organization_name
		//test the query
		const update_organizationname = await organization.updateName({
			workspace,
			organization_name,
		})

		res
			.status(200)
			.json({ organization_name: update_organizationname.organization_name })
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post(
	'/update/logo',
	authorization,
	uploadfile,
	async (req, res, next) => {
		try {
			const workspace = req.workspace
			const logo =
				process.env.SPACE_DOMAIN + req.file.originalname ??
				'https://mindvision.sgp1.digitaloceanspaces.com/assets/user/default_user_image.png'

			// Test the query
			const update_organizationlogo = await organization.updateLogo({
				workspace,
				logo,
			})
			res.setHeader('logo', update_organizationlogo.logo)
			// res.status(200).json({logo:result.logo});
			res.status(200).json({
				success: true,
				message: 'Organization logo  successfully ',
				data: { logo: update_organizationlogo },
			})
		} catch (error) {
			// console.error(error);
			// res.status(500).json({ error: 'Internal Server Error' });
			next(error)
		}
	}
)

router.post('/whatsapp/number/update', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const whatsapp_number = req.body.whatsapp_number
		//test the query
		const update_whatsapp_number = await organization.updateNumber({
			workspace,
			whatsapp_number,
		})

		res
			.status(200)
			.json({
				success: true,
				message: 'Organization whatsapp number updated successfully ',
				data: update_whatsapp_number,
			})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/billing/update', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const billing_details = req.body.billing_details

		//test the query
		const update_billing = await organization.updateBiller({
			workspace,
			billing_details,
		})

		res.status(200).json({
			success: true,
			message: 'Organization billing updated successfully ',
			data: update_billing,
		})
	} catch (error) {
		// console.error(error);
		// res.status(500).json({ error: 'Internal Server Error' });
		next(error)
	}
})

router.post('/delete', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const delete_organization = await organization.delete({ workspace })

		res.status(200).json({
			success: true,
			message: 'Organization deleted successfully ',
			data: delete_organization,
		})
	} catch (error) {
		console.error(error)

		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
router.post(
	'/label/add',
	authorization,
	labelRateLimiter,
	async (req, res, next) => {
		try {
			const workspace = req.workspace
			const customer_labels = req.body.customer_labels // Fix the typo here

			const organization_labeladd = await organization.addLabel({
				workspace,
				customer_labels,
			})

			// Fix the function name
			res.status(200).json({
				success: true,
				message: 'label added successfully ',
				//	data: result,
			})
		} catch (error) {
			console.error(error)
			res.status(400).json({ success: false, message: 'already existing ' })
			next(error)
		}
	}
)

router.post('/label/list', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const organization_labellist = await organization.listLabel({ workspace })
		res.status(200).json({
			success: true,
			message: 'Organization label listed successfully ',
			data: organization_labellist,
		})
	} catch (error) {
		console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' });
		next(error)
	}
})

// router.post('/label/delete', authorization, async (req, res,next) => {
//     console.log(req.body)
// 	try {

//         const workspace = req.workspace;
//         const customer_labels = req.body.customer_labels;
//         const organization_labeldelete = await organization.deleteLabel({workspace, customer_labels});

// 		res.status(200).json({
// 			success: true,
// 			message: 'Organization label deleted successfully ',
// 			data: organization_labeldelete,
// 		})
//     } catch (error) {
//         console.error(error);
//         // res.status(500).json({ error: 'Internal Server Error' });
// 		next(error)
// 	}
// });
router.post('/label/delete', authorization, async (req, res, next) => {
	const session = await mongoose.startSession()
	session.startTransaction()
	try {
		const workspace = req.workspace
		const customer_labels = req.body.customer_labels

		const removelabel_customer = await customer.revomeLabel({
			workspace,
			labels: customer_labels,
			session,
		})
		const deletelabel_organization = await organization.deleteLabel({
			workspace,
			customer_labels,
			session,
		})

		await session.commitTransaction()
		session.endSession()
		res.status(200).json({
			success: true,
			message: 'Deletion successful',
			data: {
				customerDeleteResult: removelabel_customer,
				organizationDeleteResult: deletelabel_organization,
			},
		})
	} catch (error) {
		await session.abortTransaction()
		session.endSession()
		next(error)
	}
})

// router.post('/label/delete', authorization, async (req, res, next) => {
// 	console.log('label_delete',req.body);

//     try {
//         const workspace = req.workspace;
//         const customer_labels = req.body.customer_labels;
// 		console.log("_________________________________________")
//         console.log(customer_labels)
//         console.log("_________________________________________")

//         const removelabel_customer = await customer.revomeLabel({ workspace, labels:customer_labels });
//        // const deletelabel_organization = await organization.deleteLabel({ workspace, customer_labels });
//         res.status(200).json({
//             success: true,
//             message: 'Deletion successful',
//             data: {
//                 customerDeleteResult: removelabel_customer,
//               //  organizationDeleteResult: deletelabel_organization
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router
