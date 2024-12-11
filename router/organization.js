const express = require('express')
const router = express.Router()
const Masfob = require('../masfob')
const authorization = require('../function/auth')
const uploadfile = require('../function/upload_file')

const Agent = require('../schema/agent')

const masfob = new Masfob()

router.use(express.json())

router.post('/create', async (req, res) => {
	console.log(req.body)
	try {
		const workspace = req.body.workspace

		const existingOrganization = await masfob.exitingWorkspace(workspace)
		if (existingOrganization) {
			return res.status(400).json({ error: 'workspace already exists' })
		}

		const organizationData = {
			organization_name: req.body.organization_name,
			workspace: workspace,
		}
		const Agentdata = {
			name: req.body.agent_name,
			email: req.body.email,
			password: req.body.password,
			workspace: workspace,
			role: 'SUPERADMIN',
		}
		const result = await masfob.createOrganization(organizationData)
		const adentcreate = await masfob.addAgent(Agentdata)

		res.status(200).json({ message: 'successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

//list route changed to fetch
router.get('/fetch', authorization, async (req, res) => {
	console.log(req.workspace)
	try {
        
		const result = await masfob.fetchOrganizations(req.workspace)

        result.email = req.email;
		console.log("####################");
console.log(result);
console.log("####################");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update', authorization, async (req, res) => {
	console.log(req.body)
	try {
		//check the data i have removed the workspace
		const newData = {
			organization_name: req.body.organization_name,
			logo: req.body.logo,
			billing_details: JSON.parse(req.body.billing_details),
			tags: req.body.tags,
		}

		//test the query
		const result = await masfob.updateOrganization(workspace, newData)

		res.status(200).json(result)
	} catch (error) {
		console.error(error)

		if (error.message === 'Organization not found or not modified') {
			res.status(404).json({ error: 'Organization not found or not modified' })
		} else {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
})
router.post('/name/update', authorization, async (req, res) => {
	console.log(req.body)
	try {
		const workspace = req.workspace
		const organization_name = req.body.organization_name
		//test the query
		const result = await masfob.updateOrganizationName(workspace, organization_name)

		res.status(200).json({organization_name:result.organization_name})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/update/logo', authorization,uploadfile,async (req, res) => {
    console.log(req.body)
	try {
        const workspace = req.workspace;
        const logo = process.env.SPACE_DOMAIN + req.file.originalname ?? 'undefined'

        // Test the query
        const result = await masfob.updateOrganizationLogo(workspace, logo);

		res.setHeader('logo', result.logo);
        res.status(200).json({logo:result.logo});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/billing/update', authorization, async (req, res) => {
	console.log(req.body)
	try {
		//check the data i have removed the workspace
		// const newData = {
		// 	organization_name: req.body.organization_name,
		// 	logo: req.body.logo,
		// 	billing_details: JSON.parse(req.body.billing_details),
		// 	tags: req.body.tags,
		// }
const workspace= req.workspace
const billing_details=req.body

		//test the query
		const result = await masfob.updateOrganizationBiller(workspace, billing_details)

		res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delete', authorization, async (req, res) => {
	console.log(req.body)
	try {
		const result = await masfob.deleteOrganization(req.workspace)

		res.status(200).json(result)
	} catch (error) {
		console.error(error)

		res.status(500).json({ error: 'Internal Server Error' })
	}
})
router.post('/label/add', authorization, async (req, res) => {
    console.log(req.workspace);
    console.log(req.body);
    try {
        const workspace = req.workspace;
        const customer_labels = req.body.customer_labels; // Fix the typo here

        const result = await masfob.addOrganizationLabel(workspace, customer_labels); // Fix the function name
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/label/list', authorization, async (req, res) => {
	console.log(req.workspace)
	try {
        const workspace = req.workspace;
        const result = await masfob.listLabel(workspace);
        console.log(result);
        res.status(200).json(result.customer_labels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/label/delete', authorization, async (req, res) => {
    console.log(req.body)
	try {
		
        const workspace = req.workspace;
        const customer_labels = req.body.customer_labels;
		console.log(workspace);
		console.log(customer_labels);
		console.log("*************");
        const result = await masfob.deleteLabel(workspace, customer_labels);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router
