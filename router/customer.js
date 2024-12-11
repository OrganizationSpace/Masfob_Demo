const express = require('express')
const router = express.Router()
const zlib = require('zlib')
const Masfob = require('../masfob') // Update the path based on your actual file structure
const authorization = require('../function/auth')
const optInOut = require('../function/opt_in_out')

const masfob = new Masfob()

router.use(express.json())
router.post('/add', authorization, async (req, res) => {
	try {
		// Extract the form data
		const Customerdata = {
			workspace: req.workspace,
			name: req.body.name,
			display_name: req.body.display_name,
			email: req.body.email,
			password: req.body.password,
			phone_number: req.body.phone_number,
			country_code: req.body.country_code,
			tags: req.body.tags,
		}
		const result = await masfob.addCustomer(Customerdata)
		res.status(200).json(result)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/import', authorization, async (req, res) => {
	try {
		const encodedString = req.body.encodedString
		const decodedBuffer = Buffer.from(encodedString, 'base64')
		const decompressedBuffer = await new Promise((resolve, reject) => {
			zlib.gunzip(decodedBuffer, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
		const decodedString = decompressedBuffer.toString('utf-8')
		// console.log(decodedString);

		const Customers = JSON.parse(decodedString)
		console.log(Customers.length)

		for (const Customer of Customers) {
			Customer.workspace = req.workspace
		}
		await masfob.importCustomer(Customers)
		res.status(200).json({ message: 'Customers imported successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.get('/list', authorization, async (req, res) => {
	try {
		const workspace = req.workspace
		const result = await masfob.listCustomers(workspace)

		const Customers = result.Customers || []

		const CustomersJson = JSON.stringify(Customers)

		const compressedData = zlib.gzipSync(CustomersJson)

		const encodedData = compressedData.toString('base64')

		res.status(200).json({ encodedData })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/update', authorization, async (req, res) => {
	try {
		const phone_number = req.body.phone_number
		const workspace = req.workspace
		const newData = {
			name: req.body.name,
			display_name: req.body.display_name,
			email: req.body.email,
			password: req.body.password,
			country_code: req.body.country_code,
			tags: req.body.tags,
		}

		//check the function
		const result = await masfob.updateCustomer(phone_number, workspace, newData)

		res.status(200).json({ success: true, result: result })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

router.post('/label/assign', authorization, async (req, res) => {
    try {
        const workspace = req.workspace;
        const ids = req.body.ids; // Use _ids instead of _id for an array
        const labels = req.body.labels;

        const result = await masfob.listLabelAssign(workspace, ids, labels);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/label/delete/assign', authorization, async (req, res) => {
    try {
        const workspace = req.workspace;
        const labels = req.body.labels;

        const result = await masfob.labelDeleteAssign(workspace, labels);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/optout', authorization, async (req, res) => {
    try {
        const workspace = req.workspace;
        const phone_number = req.body.phone_number;
        const opt=req.body.opt;

        const result = await optInOut(workspace, phone_number,opt);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delete', authorization, async (req, res) => {
	try {
		const workspace =req.workspace
		const ids = req.body.ids
		//check the functions
		const result = await masfob.deleteCustomer(workspace, ids)

		res
			.status(200)
			.json({ success: true, message: 'Customer deleted successfully' })
	} catch (error) {
		console.error(error)

		res.status(500).json({ error: 'Internal Server Error' })
	}
})



module.exports = router
