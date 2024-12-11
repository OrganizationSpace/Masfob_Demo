const express = require('express')
const router = express.Router()
const Masfob = require('../masfob')
const uploadfile = require('../function/s3/upload_file')
const getFileSize = require('../function/s3/get_file_size')
const authorization = require('../function/auth')
const masfob = new Masfob()

router.use(express.json())

router.post('/add', authorization, uploadfile, async (req, res) => {
	try {
		const { filename } = req.body
		const { originalname } = req.file
		const extension = req.extension.slice(1)

		const file_size = await getFileSize(originalname)

		const assetData = {
			workspace: req.workspace,
			name: filename ?? 'undefined',
			url: process.env.SPACE_DOMAIN + originalname,
			size: file_size,
			format: extension,
			tags: req.body.tags,
		}

		const result = await masfob.addAsset(assetData)
		res.status(200).json({ result, message: 'Asset added successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
	}
})

router.get('/list', authorization, async (req, res) => {
	try {
		const workspace = req.workspace
		const { assets } = await masfob.listAssets(workspace)
		res.status(200).json({ success: true, result: assets })
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

//router.post("/update", uploadfile,async (req, res) => {
//   try {
//     const id = req.body.id;
//   const { filename } = req.body
// 	const { originalname } = req.file
// 	const extension = req.extension.slice(1)

// 	const file_size = await getFileSize(originalname)
//     const newData = {
//       workspace: req.body.workspace,
//       name:  filename ?? 'undefined',
//       url: process.env.SPACE_DOMAIN + originalname,
//       size: file_size,
//       format: extension,
//       tags: req.body.tags,
//     };

//     const { updatedAsset } = await masfob.updateAsset(id, newData);
//     res.status(200).json({ success: true, result:updatedAsset, message: "Asset updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post('/delete', authorization, async (req, res) => {
	try {
		const workspace = req.workspace
		const asset_id = req.body.asset_id
		const url = req.body.url
		console.log('Asset to delete:', asset_id)

		//remove from s3 before use s3 delete functions
		const result = await masfob.deleteAsset(workspace,asset_id,url)

		res.status(200).json(result)
	} catch (error) {
		console.error(error)

		res.status(500).json({ error: 'Internal Server Error' })
	}
})

module.exports = router
