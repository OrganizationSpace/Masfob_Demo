const express = require('express')
const router = express.Router()
const Masfob = require('../masfob') // Update the path based on your actual file structure
const authorization = require('../function/auth')
// const Adminvalidation = require('../function/auth_validation')(['SUPERADMIN'])
const masfob = new Masfob()

router.use(express.json())

// Route to create an agent
router.post('/add', authorization, async (req, res) => {
	try {
		// Extract the form data
		const Agentdata = {
			workspace: req.workspace,
			name: req.body.name,
			role: 'AGENT',
			email: req.body.email,
			password: req.body.password,
			phone_number: req.body.phone_number,
			tags: req.body.tags,
		}
		const result = await masfob.addAgent(Agentdata)
		res.status(200).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/login', async (req, res) => {
    try {
        const { workspace, email, password } = req.body;

        // Assuming masfob.agentLogin returns an object with 'error' and 'token' properties
        const agentResult = await masfob.agentLogin(workspace, email, password);

        if (agentResult.error) {
            return res.status(400).json({ error: agentResult.error });
        }

        console.log(agentResult);

        // Assuming masfob.fetchOrganizations returns an object with 'organization_name' property
        const organization = await masfob.fetchOrganizations(workspace);

        res.setHeader('token', agentResult.token);
        res.setHeader('workspace', workspace);
		res.setHeader('email', email);
		res.setHeader('organization_name', organization.organization_name);
		res.setHeader('logo', organization.logo);
        res.status(200).json({
            message: 'Login successful',
          
          
			// Assuming agentResult contains workspace
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/list', authorization, async (req, res) => {
	try {
		const workspace = req.workspace
		const result = await masfob.listAgents(workspace)
		res.status(200).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

// Route to update an agent
router.post('/update', authorization, async (req, res) => {
	console.log(req.workspace)
	console.log(req.body)
	try {
		const workspace = req.workspace
		const role = req.body.role
		const email= req.body.email	
			
		const result = await masfob.updateAgent(workspace, role,email)
		res.status(200).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})


// Route to delete an agent
router.post('/delete', authorization, async (req, res) => {
	console.log(req.workspace)
	console.log(req.body)
	try {
		const workspace = req.workspace
		const email = req.body.email
		//check the function
		const result = await masfob.deleteAgent(workspace, email)
		res.status(200).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

module.exports = router
