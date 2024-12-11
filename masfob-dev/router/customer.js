const express = require('express')
const router = express.Router()
const zlib = require('zlib')
const Customer_ = require('../schema/customer')
const mongoose = require('mongoose')
const Customer = require('../controller/customer') // Update the path based on your actual file structure
const Organization = require('../controller/organization')
const authorization = require('../function/auth')
const optInOut = require('../function/opt_in_out')
const { sign, attestation } = require('../function/signature')

const customerRateLimiter = require('../rate_limiter/customer')
const { decrypt, encrypt } = require('../function/converstion')
const customerImportRateLimiter = require('../rate_limiter/import_customer')
const { Console, log } = require('console')
const bodyParser = require('body-parser')
//const organization_ = require('../schema/organization')

const customer = new Customer()
const organization = new Organization()

// router.use(express.json())
// router.use(urlencoded({ extended: true }))
//router.use(express.json({ limit: '10mb' }));
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true }))

router.post(
	'/add',
	authorization,
	customerRateLimiter,
	async (req, res, next) => {
	  try {
		////console.log("masfob_req body",req.body);
		const workspace = req.workspace;
		const { phone_number, email, name, display_name, country_code = '91', tags, labels } = req.body;
  
		// Check if the contact number already exists
		if (phone_number) {
		  const existingNumber = await customer.existingNumber({ workspace, phone_number });
		  if (existingNumber) {
			return res.status(400).json({
			  success: false,
			  message: 'The contact number already exists',
			  data: {},
			});
		  }
		}
  
		// Check if the email already exists
		if (email) {
		  const existingEmail = await customer.existingMail({ workspace, email });
		  if (existingEmail) {
			return res.status(400).json({
			  success: false,
			  message: 'The email already exists',
			  data: {},
			});
		  }
		}
  
		// Add new customer
		const newCustomer = await customer.add({
		  workspace,
		  name,
		  display_name,
		  phone_number: phone_number || 'undefined',
		  email: email || 'undefined',
		  country_code,
		  tags,
		  labels,
		});
  
		// Respond with success message
		res.status(200).json({
		  success: true,
		  message: 'Customer added successfully',
		  data: { _id: newCustomer._id },
		});
	  } catch (error) {
		console.error(error);
		next(error);
	  }
	}
  );
// router.post('/import', authorization, async (req, res,next) => {
// 	//console.log("--------------------------------------------------------------------------------------");
// 	//console.log("body data------>",req.body)
// 	//console.log("------------------------------------------------------------------------------------------------");
// 	try {
// 		const encodedString = req.body.encodedString
// 		const decodedBuffer = Buffer.from(encodedString, 'base64')
// 		const decompressedBuffer = await new Promise((resolve, reject) => {
// 			zlib.gunzip(decodedBuffer, (err, result) => {
// 				if (err) {
// 					reject(err)
// 				} else {
// 					resolve(result)
// 				}
// 			})
// 		})
// 		const decodedString = decompressedBuffer.toString('utf-8')
// 		//console.log('________________________________________________');
// 		//console.log(decodedString);
// 		//console.log('________________________________________________');
// 		 const Customers = JSON.parse(decodedString)
// 		//  //console.log('________________________________________________');
//         //  //console.log(Customers);
//         //  //console.log('________________________________________________');
// 		// //console.log(Customers.length)

// 		for (const Customer of Customers) {
// 			Customer.workspace = req.workspace
// 			Customer.email=req.body.email||'undefined'
// 			Customer.country_code = req.body.country_code || '91'
// 			Customer.tags=req.body.tags||'undefined'
// 			////console.log('Customer:', Customer);
// 			////console.log('Customer:', Customer);
// 		}
// 		//console.log('________________________________________________');
// 		//console.log('Customer:', Customers);
// 		//console.log('________________________________________________');

// 		// await Customer_.insertMany(Customers)
// 		 await customer.import(Customers)
// 		res.status(200).json({
// 			success: true,
// 			message: 'Customer imported successfully ',
// 			data: Customers,
// 		})
// 	} catch (error) {
// 		// console.error(error)
// 		// res.status(500).json({ error: 'Internal Server Error' })
// 		next(error)
// 	}
// })

router.post(
	'/import',
	authorization,
	decrypt,
	customerImportRateLimiter,
	async (req, res, next) => {
		try {
			const Customers = req.decryptedData

			for (const Customer of Customers) {
				//console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
				//console.log("customer",Customer.name);
				//console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

				Customer.workspace = req.workspace
				Customer.display_name = Customer.name
				//Customer.phone_number = req.body.phone_number || 'undefined';
				//Customer.country_code = req.body.country_code || '91';
				//Customer.tags = req.body.tags || 'undefined';
			}

			await customer.import(Customers)
			res.status(200).json({
				success: true,
				message: 'Customer imported successfully ',
				data: Customers,
			})
		} catch (error) {
			console.error(error)
			next(error)
		}
	}
)

router.post('/list', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const result = await customer.list({ workspace })

		const Customers = result || []

		const CustomersJson = JSON.stringify(Customers)

		const compressedData = zlib.gzipSync(CustomersJson)

		const encodedData = compressedData.toString('base64')

		res.status(200).json({
			success: true,
			message: 'Customer List successfully ',
			data: encodedData,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})



router.post('/birthday/list', async (req, res, next) => {
	try {
	  const { workspace } = req.body;
  console.log("HHHHHHHHHHHH");
	 console.log(workspace);
	 console.log("HHHHHHHHHHHH");
  console.log("111111111111");
	  const users = await customer.listBirth({ workspace });
  console.log(users);
  console.log("2222222222222222");
	  res.status(200).json({
		success: true,
		message: 'Customer List successfully retrieved',
		data: users,
	  });
	} catch (error) {
	  next(error);
	}
  });


router.post('/update', authorization, async (req, res, next) => {
	try {
		////console.log("update",req.body);

		const _id = req.body._id
		const workspace = req.workspace

		const name = req.body.name
		const email = req.body.email
		const password = req.body.password
		const display_name = req.body.display_name
		const phone_number = req.body.phone_number
		const country_code = req.body.country_code
		const tags = req.body.tags
if(phone_number){
	const existing_number = await customer.existingNumber({
		workspace,
		phone_number,
	})

	if (existing_number && existing_number._id.toString() !== _id) {
		return res.status(400).json({
			success: false,
			message: 'The contact number already existing',
			data: {},
		})
	}}

	if(email){const existing_email = await customer.existingMail({ workspace, email })

		if (existing_email && existing_email._id.toString() !== _id) {
			return res.status(400).json({
				success: false,
				message: 'The email already existing',
				data: {},
			})
		}
}
		
		//check the function
		const update_customer = await customer.update({
			_id,
			phone_number,
			workspace,
			name,
			display_name,
			country_code,
			email,
			password,
			tags,
		})

	//	//console.log("masfob_update_customer",update_customer);
		res.status(200).json({
			success: true,
			message: 'Customer updated successfully ',
			data: { _id: update_customer._id },
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/label/add', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const labels = req.body.labels

		const add_label = await organization.addLabel({
			workspace: workspace,
			customer_labels: labels,
		})
		res.status(200).json({
			success: true,
			message: 'Customer label Added successfully ',
			data: { _id: add_label._id },
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
//cmd

router.post('/label/list', authorization, async (req, res, next) => {
	try {
		const list_label = await organization.listLabel({
			workspace: req.workspace,
		})
		res.status(200).json({
			success: true,
			message: 'Customer label listed successfully ',
			data: list_label,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/label/assign', authorization,decrypt, async (req, res, next) => {
	// //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");	
	// //console.log(req.body);
	// //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	try {
		const workspace = req.workspace
		const _id = req.decryptedData.ids
		const labels = req.body.labels

		const assign_label = await customer.assignLabel({ workspace, labels, _id })

		res.status(200).json({
			success: true,
			message: 'Customer labels Assigned successfully ',
			data: { _id: assign_label._id },
		})
	} catch (error) {
		next(error)
	}
})

//_id based the route can be assign the labels

// router.post('/label/assign/v2', authorization, async (req, res,next) => {
// 	//console.log(req.body)
// 	 try {
// 		 const workspace = req.workspace;
// 		 const ids = req.body.ids; // Use _ids instead of _id for an array
// 		 const labels = req.body.labels;

// 		 const assign_label = await customer.assignLabelv2({workspace, ids, labels});
// 		 //console.log(assign_label);
// 		 res.status(200).json({
// 			 success: true,
// 			 message: 'Customer labels Assigned successfully ',
// 			 data:{_id:assign_label._id},
// 		 })
// 	 } catch (error) {
// 		 // console.error(error);
// 		 // res.status(500).json({ error: 'Internal Server Error' });
// 		 next(error)
// 	 }
//  });

// router.post('/label/delete/assign',authorization, async (req, res,next) => {

// 	const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const workspace = req.workspace;
// 		const labels = req.body.labels;

//         const removelabel_customer = await customer.revomeLabel({ workspace, labels,session });
//         const deletelabel_organization = await organization.deleteLabel({ workspace, customer_labels:labels,session });

// 		await session.commitTransaction();
//         session.endSession();
//         res.status(200).json({
//             success: true,
//             message: 'Deletion successful',
//             data: {
//                 customerDeleteResult: removelabel_customer,
//                 organizationDeleteResult: deletelabel_organization
//             }
//         });
//     } catch (error) {
// 		await session.abortTransaction();
//         session.endSession();
//         next(error);
//     }
// });

// router.post('/label/delete', authorization, async (req, res,next) => {
// 	//console.log(req.body);
//     try {
//         const workspace = req.workspace;
//         const labels = req.body.labels;

//         const result = await organization.labelDelete({workspace, labels});
//         //console.log(result);
// 		res.status(200).json({
// 			success: true,
// 			message: 'Customer labels deleted successfully ',
// 		})
//     } catch (error) {
//         // console.error(error);
//         // res.status(500).json({ error: 'Internal Server Error' });
// 		next(error)
// 	}
// });

// router.post('/label/delete', authorization, async (req, res, next) => {

// 	const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const workspace = req.workspace;
//         const labels = req.body.labels;

//         const removelabel_customer = await customer.revomeLabel({ workspace, labels,session });
//         const deletelabel_organization = await organization.deleteLabel({ workspace, customer_labels:labels,session });

// 		await session.commitTransaction();
//         session.endSession();

// 		res.status(200).json({
//             success: true,
//             message: 'Deletion successful',
//             data: {
//                 customerDeleteResult: removelabel_customer,
//                 organizationDeleteResult: deletelabel_organization
//             }
//         });
//     } catch (error) {
// 		await session.abortTransaction();
//         session.endSession();
//         next(error);
//     }
// });

router.post('/optout', async (req, res, next) => {
	try {
		const workspace = req.body.workspace
		const phone_number = req.body.phone_number
		const opt = req.body.opt

		const result = await optInOut(workspace, phone_number, opt)
		res.status(200).json(result)
	} catch (error) {
		// console.error(error);
		// res.status(500).json({ error: 'Internal Server Error' });
		next(error)
	}
})

//inderact customer delete route

router.post('/delete', authorization,decrypt, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const _id = req.decryptedData.ids
		
		//check the functions
		const delete_customer = await customer.delete({ workspace, _id })

		res.status(200).json({
			success: true,
			message: 'Customer Deleted successfully ',
			data: delete_customer,
		})
	} catch (error) {
		// console.error(error)

		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/optout/list', async (req, res, next) => {
	try {
		const workspace = req.body.workspace

		const result = await customer.findOptInOut({ workspace })

		res.status(200).json({
			success: true,
			message: 'successfully updated',
			data: result,
		})
	} catch (error) {
		next(error)
	}
})

// //account center customer delete route

// router.post('/delete/v2', authorization, async (req, res,next) => {
// 	//console.log(req.body)
// 	try {
// 		const workspace =req.workspace
// 		const ids = req.body.ids
// 		//check the functions
// 		const delete_customer = await customer.deletev2({workspace, ids})

// 		res.status(200).json({
// 			success: true,
// 			message: 'Customer Deleted successfully ',
// 			data: delete_customer,
// 		})	} catch (error) {
// 		// console.error(error)

// 		// res.status(500).json({ error: 'Internal Server Error' })
// 		next(error)
// 	}
// })

router.post('/list/test', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const C_Date= new Date()
		const currentDate = new Date(C_Date.setUTCHours(0, 0, 0, 0)).toISOString();
		const result = await customer.listTest({workspace,currentDate })

		res.status(200).json({
			success: true,
			message: 'Customer List successfully ',
			data: result,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
router.post('/list/testh2', authorization,async (req, res, next) => {
	try {
	 const workspace = req.workspace;
	  const users = await customer.list({workspace});
  
	  console.log("Users:", users);
  
	  const currentDate = new Date();
	  const currentDay = currentDate.getDate();
	  const currentMonth = currentDate.getMonth() + 1;
  
	  const respond = users.filter(user => {
		const userDOB = new Date(user.DOB);
		const userDay = userDOB.getDate();
		const userMonth = userDOB.getMonth() + 1;
  
		return userDay === currentDay && userMonth === currentMonth;
	  }).map(user => ({
		name: user.name,
		phone_number: user.phone_number,
		country_code: user.country_code
	  }));
  
	  console.log("Birthday Users:", respond);
  
	 const axiosData= await axios.post('http://192.168.0.5:1115/contact/test', respond,{
		headers: {
			Authorization: token,
		},
	});
  console.log("@@@@@@",axiosData);
	  res.status(200).json({
		success: true,
		message: 'Customer List processed successfully',
		 data: respond,
	  });
	} catch (error) {
	  console.error(error);
  
	  next(error);
	}
  });


module.exports = router
