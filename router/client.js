const express = require('express')
const router = express.Router()
const Client = require('../controller/client') // Update the path based on your actual file structure
const authorization = require('../function/auth')
const customerRateLimiter = require('../rate_limiter/customer')
// const Adminvalidation = require('../function/auth_validation')(['SUPERADMIN'])
const { urlencoded } = require('body-parser')
const { generatedAgentToken, generateClientToken } = require('../function/sign_tocken')
const { sign, attestation } = require('../function/signature')
const Organization = require('../controller/organization')
const client = new Client()
const organization = new Organization()

router.use(express.json())
router.use(urlencoded({ extended: true }))


// router.post('/login', async (req, res,next) => {
//     try {
//         const { workspace, email, password,tag } = req.body;

//         // Assuming masfob.agentLogin returns an object with 'error' and 'token' properties
//         const clientResult = await client.clientLogin({workspace, email, password,tag});

//         if (clientResult.error) {
//             return res.status(400).json({ error: clientResult.error });
//         }

//         console.log(clientResult);

//         res.setHeader('token', clientResult.token);
//         // res.setHeader('workspace', workspace);
// 		// res.setHeader('email', email);
// 		// res.setHeader('organization_name', organization.organization_name);
// 		//res.setHeader('logo', organization.logo);
//         res.status(200).json({
// 			success:true,
//             message: 'Login successful',
//           data:{
// 			token:clientResult.token
// 		  }

// 			// Assuming agentResult contains workspace
//         });
//     } catch (error) {
//         // console.error(error);
//         // res.status(500).json({ error: 'Internal Server Error' });
// 		next(error)
//     }
// });


router.post('/login', async (req, res, next) => {
	
	try {
		const { workspace, email, password, tag } = req.body;

		// Assuming masfob.agentLogin returns an object with 'error' and 'token' properties
		const login_client = await client.fetch({ workspace, email, password });
		if (login_client == null) {
			return res.status(400).json({ success: false, message: 'invalid credentials ', data: {} })
		}
		if (login_client.error) {
			return res.status(400).json({ error: login_client.error });
		}

		const token = generateClientToken(login_client);
		res.setHeader('token', token);
		res.status(200).json({
			success: true,
			message: 'Login successful',
			data: {
				token: token
			}

			// Assuming agentResult contains workspace
		});
	} catch (error) {
		// console.error(error);
		// res.status(500).json({ error: 'Internal Server Error' });
		next(error)
	}
});

//the route was not used  in /client/add
//used to indcharge
//the route used indesk
router.post('/add',customerRateLimiter, authorization, async (req, res,next) => {
	try {

		const add_client = await client.add({workspace: req.workspace,
			email: req.body.email,
			name: req.body.name || 'undefined',
			password: req.body.password,
		    tag:req.body.tag
		})
	//	console.log(add_client)
		res.status(200).json({
			success: true,
			message: 'Client added successfully ',
			data: {_id:add_client._id},
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
router.post('/add/unauthorised', async (req, res, next) => {
	try {
		const { workspace, email, name = 'undefined', display_name = 'undefined', country_code, phone_number = 'undefined', password, tag } = req.body;
		
		const valid_workspace = await organization.isExisting({ workspace });
		
		if (valid_workspace !== null) {
			const existing_email = await client.isExisting({ email });
			if (existing_email) {
				const existing_email_update = await client.updateExisting({ email, name, display_name, country_code, phone_number, password, tag });
				//console.log("existing_email_update", existing_email_update);
				return res.status(200).json({
					success: true,
					message: 'Email updated successfully',
					data: { _id: existing_email_update._id },
				});
			} else {
				const add_client = await client.add({ workspace, email, name, display_name, phone_number, country_code, password, tag });
				return res.status(200).json({
					success: true,
					message: 'Your data has been recorded',
					data: { _id: add_client._id },
				});
			}
		} else {
			return res.status(400).json({
				success: false,
				message: 'Invalid workspace',
				data: {},
			});
		}
	} catch (error) {
		if (error.status === 429) {
			return res.status(429).json({
				success: false,
				message: error.message,
			});
		} else {
			console.error(error);
			next(error);
		}
	}
});




router.post('/add/unauthorised/label', async (req, res, next) => {
    try {
       // console.log("000000000000000000000", req.body);

        const { workspace, email, name = 'undefined', display_name = 'undefined', phone_number = 'undefined', password, labels, tag } = req.body;
    
        // Validate workspace
        const valid_workspace = await organization.isExisting({ workspace });

        if (valid_workspace) {
            const existing_client = await client.isExisting({ email });

            if (!existing_client) {
                // Add new client if no existing client found
				
                const newClient = await client.update({
                    workspace,
                    email,
                    name,
                    display_name,
                    phone_number,
                    password,
                    labels,
                    tag
                });
              //  console.log("New client added:", newClient);
                return res.status(200).json({
                    success: true,
                    message: 'Your data has been recorded',
                    data: { _id: newClient._id },
                });
            } else {
                // Update labels for existing client
                const _id = existing_client._id;
                const updatedClient = await client.addLabels({ _id, labels });
               // console.log("Labels updated for existing client:", updatedClient);
                return res.status(200).json({
                    success: true,
                    message: 'Labels updated successfully',
                    data: { _id: updatedClient._id },
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid workspace',
                data: {},
            });
        }
    } catch (error) {
        next(error);
    }
});


router.post('/profile/picture/upload', authorization, async (req, res, next) => {

	try {

		const upload_picture = await client.uploadPicture({
			workspace: req.workspace,
			email: req.email,
			url: req.body.url
		})
		res.status(200).json({
			success: true,
			message: 'Client profile picture uploaded successfully ',
			data: upload_picture,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/profile/fetch', authorization, async (req, res, next) => {
	try {

		const fetch_profile = await client.fetchProfile({
			workspace: req.workspace,
			email: req.email,
		})
		res.status(200).json({
			success: true,
			message: 'Client profile fetch successfully ',
			data: fetch_profile,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/list', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const tag = req.body.tag
		const list_client = await client.list({ workspace, tag })
		res.status(200).json({
			success: true,
			message: 'Client Listed successfully ',
			data: list_client
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
router.post('/delete', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const email = req.body.email
		const tag = req.body.tag
		//check the function
		const delete_client = await client.delete({ workspace, email, tag })
		res.status(200).json({
			success: true,
			message: 'Client deleted successfully ',
			//data: result,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

module.exports = router
