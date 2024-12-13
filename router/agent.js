//route name change
//agent/update--> agent/role/change

const express = require('express')
const router = express.Router()
const Organization = require('../controller/organization')
const bodyParser = require('body-parser')
const Agent_ = require('../schema/agent')
const Agent = require('../controller/agent') // Update the path based on your actual file structure
const Environment = require('../controller/environment')
const Otp = require('../controller/otp')
const authorization = require('../function/auth')
const { sign, attestation } =require('../function/signature')
const { setChannel, sendToQueue, ack, nack } = require('../rabbitmq/channel')
const {
	generateAgentToken,
	generateClientToken,
} = require('../function/sign_tocken')
// const Adminvalidation = require('../function/auth_validation')(['SUPERADMIN'])

const agentRateLimiter = require('../rate_limiter/agent')

const { urlencoded } = require('body-parser')
const axios = require('axios')
const environment = new Environment()
const agent = new Agent()
const otp = new Otp()
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))
// Route to create an agent

router.post('/add', authorization,agentRateLimiter, async (req, res, next) => {
	try {
		//console.log(req.body);
		const workspace = req.workspace
		const email = req.body.email
		const name = req.body.name || 'undefined'
		const role = req.body.role || 'AGENT'
		const password = req.body.password

		const valid_agent = await agent.isExistingAgent({workspace:workspace,email})
		
		if (valid_agent !== null) {
			res.status(400).json({
				success: false,
				message: 'email already existing',
				data: {},
			})
		} else {
		const add_agent = await agent.add({
			workspace: workspace,
			name: name,
			role: role,
			email: email,
			password: password,
			
		})
		//console.log("agent",add_agent);

		sendToQueue('account_center', 'SERVICE_MAIL', {
			service: 'AGENT_ADDED',
			agent: add_agent,
		})
		res.status(200).json({
			success: true,
			message: 'Agent added successfully ',
			data: { _id: add_agent._id },
		})}
	} catch (error) {
            console.error(error);
            next(error);
    }
});



// router.post('/login', async (req, res,next) => {
// 	console.log(req.body)
//     try {
//         const { workspace, email, password,tag } = req.body;

//         // Assuming agent.agentLogin returns an object with 'error' and 'token' properties
//         const agentResult = await agent.agentLogin({workspace, email, password,tag});

//         if (agentResult.error) {
//             return res.status(400).json({ error: agentResult.error });
//         }

//         console.log(agentResult);

//         // Assuming agent.fetchOrganizations returns an object with 'organization_name' property
//         const organization_check = await organization.fetchOrganizations({workspace});

//         res.setHeader('token', agentResult.token);
//         // res.setHeader('workspace', workspace);
// 		// res.setHeader('email', email);
// 		// res.setHeader('organization_name', organization.organization_name);
// 		//res.setHeader('logo', organization.logo);
//         res.status(200).json({
// 			success:true,
//             message: 'Login successful',
//           data:{
// 			token:agentResult.token
// 		  }

// 			// Assuming agentResult contains workspace
//         });
//     } catch (error) {
//         // console.error(error);
//         // res.status(500).json({ error: 'Internal Server Error' });
// 		next(error)
//     }
// });

router.post('/login',attestation, async (req, res, next) => {
	// console.log(req.body)
	// console.log('----------------------------------------------');
	// console.log(req.headers)
	// console.log('----------------------------------------------');

	try {
		const {  email, password, tag, code } = req.body

		const login_agent = await agent.fetch({  email, password})//agent controller
		if(login_agent==null){
			return res.status(400).json({success:false, message: 'invalid credentials ',data:{} })
		}
		// if (login_agent.error) {
		// 	return res.status(400).json({ error: login_agent.error })
		// }
		const agent_id = login_agent._id.toString()	
		//console.log("login_agent",login_agent.workspace);
		var workspace =login_agent.workspace
		const check_subscription = await environment.checkSubscription//environment controller
		({
				code,
				workspace,
			})
			// console.log('___________________________________');
			// console.log(check_subscription.data.data.limit);
			// console.log('___________________________________');

			if (check_subscription.status == 200) {
				const calendar_limit= check_subscription.data.data.limit
				const token = generateAgentToken(login_agent, '1h')//function sign_tocken
				// console.log("agent token",token);

				res.setHeader('token', token)
				res.setHeader('calendar_limit',calendar_limit)
				res.setHeader('agent_id', agent_id)
				res.status(200).json({
					success: true,
					message: 'Login successful',
					data: {
						token: token,
					},
				})
			} else {
				//console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

				res.status(400).json({
					success: false,
					message: 'kaasu illa',
				})
			}
		
	} catch (error) {
		next(error)
	}
})
router.post('/super/login',async (req, res, next) => {
	try {
		const { workspace, email, password, tag } = req.body

		const login_agent = await agent.fetch({ workspace, email, password})
        
		if(login_agent==null){
			return res.status(400).json({success:false, message: 'invalid credentials ',data:{} })
		}
		if (login_agent.role != 'SUPERADMIN') {
			return res.status(400).json({ message: ' YOU ARE NOT SUPERADMIN' })
		}
		if (login_agent.error) {
			return res.status(400).json({ error: login_agent.error })
		}


		const token = generateAgentToken(login_agent, '6h')
console.log("t o k e n",token);
		res.setHeader('token', token)
		res.status(200).json({
			success: true,
			message: 'Login successful',
			data: {
				token: token,
			},
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/update/password',authorization, async (req, res, next) => {
	try {
		const {email,password} = req.body
        const workspace = req.workspace
		
        const update_password = await agent.setPassword({workspace,email,password})
		//console.log("update_password",update_password);
		sendToQueue('account_center', 'SERVICE_MAIL', {
			service: 'PASSWORD_UPDATE',
			agent: update_password,
		})
		
		res.status(200).json({
			success: true,
			message: 'Agent password update successfully ',
			//data: find_agent,
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
		const list_agent = await agent.list({ workspace })
		//console.log("list_agent",list_agent);
		res.status(200).json({
			success: true,
			message: 'Agent Listed successfully ',
			data: list_agent,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
router.post('/info',authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const email = req.email
		const list_agent = await agent.agentInfo({ workspace, email })
		res.status(200).json({
			success: true,
			message: 'Agent Listed successfully ',
			data: list_agent,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

// Route to update an agent
router.post('/update', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const role = req.body.role
		const email = req.body.email

		const update_role = await agent.changeRole({ workspace, role, email })
		sendToQueue('account_center', 'SERVICE_MAIL', {
			service: 'ROLE_UPDATE',
			agent: update_role,
		})
		res.status(200).json({
			success: true,
			message: 'Agent role changed successfully ',
			data: { _id: update_role._id },
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

//indesk use routes
router.post('/team/add', authorization, async (req, res, next) => {
	
	try {
		const add_team = await agent.teamAdd({//multiple
			workspace: req.workspace,
			email: req.body.email,
			team: req.body.team,
		})
		
		res.status(200).json({
			success: true,
			message: 'team added successfully ',
			data: add_team,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
//indesk use routes
router.post('/team/delete', authorization, async (req, res, next) => {
	try {
		const remove_team = await agent.teamRemove({
			workspace: req.workspace,
			email: req.body.email,
			team: req.body.team,
		})
		res.status(200).json({
			success: true,
			message: 'team deleted successfully ',
			data: remove_team,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/add/team', authorization, async (req, res, next) => {
	try {
		const result = await agent.addToTeam({//single document
			workspace: req.workspace,
			email: req.body.email,
			team: req.body.team,
		})
		res.status(200).json({
			success: true,
			message: ' Add team successfully ',
			data: result,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/remove/team', authorization, async (req, res, next) => {
	try {
		const remove_team = await agent.removeFromTeam({
			workspace: req.workspace,
			email: req.body.email,
			team: req.body.team,
		})
		res.status(200).json({
			success: true,
			message: ' delete team successfully ',
			//data:result ,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})
// router.post('/teams/assign', authorization, async (req, res,next) => {
// 	console.log(req.workspace)
// 	console.log(req.body)
// 	try {
// 		const workspace = req.workspace
// 		const email = req.body.email
// 		const team =req.body.team
// 		//check the function
// 		const result = await agent.agentAsignteam({workspace, email,team})
// 		res.status(200).json({
// 			success: true,
// 			message: 'Agent team Assign successfully ',
// 			//data: result,
// 		})
// 	} catch (error) {
// 		// console.error(error)
// 		// res.status(500).json({ error: 'Internal Server Error' })
// 		next(error)
// 	}
// })

// Route to delete an agent

router.post('/delete', authorization, async (req, res, next) => {
    //console.log("workspace", req.workspace, "email", req.body.email);
    try {
        const workspace = req.workspace;
        const email = req.body.email;

        // Check the function
        const delete_agent = await agent.delete({ workspace, email });

      

       // console.log("delete_data", delete_agent);

        sendToQueue('account_center', 'SERVICE_MAIL', {
            service: 'AGENT_DELETE',
            agent: delete_agent,
        });

        res.status(200).json({
            success: true,
            message: delete_agent.message,
            data: delete_agent, // Include the data in the response if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// router.post('/delete', authorization, async (req, res, next) => {
//     console.log("workspace", req.workspace, "email", req.body.email);
//     try {
//         const workspace = req.workspace;
//         const email = req.body.email;
//         //check the function
//         const delete_agent = await agent.delete({ workspace, email });
		
// const delete_data={
// 	email,workspace
// }

// console.log("delete_data",delete_data);
// 		sendToQueue('account_center', 'SERVICE_MAIL', {
// 			service: 'AGENT_DELETE',
// 			agent: delete_agent,
// 		})
//         res.status(200).json({
//             success: true,
//             message:delete_agent,
//             // data: delete_agent,
//         });
//     } catch (error) {
//         // console.error(error)
//         res.status(500).json({ error: error.message });
//     }
// });


router.post('/superadmin/list',attestation, async (req, res, next) => {
	

	try {
		const page = req.body.page ?? 0; 
        const query = req.body.query ?? null;
		const agent_list = await agent.listSuperAdmin({page, query})
		
		res.status(200).json({
			success: true,
			message: 'superadmin list successfully ',
			data: agent_list,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

module.exports = router
