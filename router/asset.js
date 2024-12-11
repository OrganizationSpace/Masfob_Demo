const express = require('express')
const router = express.Router()
const Asset = require('../controller/asset')
const uploadfile = require('../function/s3/upload_file')
const getFileSize = require('../function/s3/get_file_size')
const { sign, attestation } = require('../function/signature')
const authorization = require('../function/auth')
const { urlencoded } = require('body-parser')
const assetRateLimiter = require('../rate_limiter/asset')
const upload = require('../function/get_filesize')

const asset = new Asset()

router.use(express.json())
router.use(urlencoded({ extended: true }))

router.post('/add', authorization,assetRateLimiter,uploadfile, async (req, res, next) => {
	console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=");
		console.log("header",req.headers);
		console.log("file",req.file);
		console.log("body",req.body);
		console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=");
	try {
		const { filename } = req.body
		const { originalname } = req.file
		const extension = req.extension.slice(1)
	

		 const file_size = await getFileSize(originalname)
		// const assetData = {
		// 	workspace: req.workspace,
		// 	name: filename ?? 'undefined',
		// 	url: process.env.SPACE_DOMAIN + originalname,
		// 	size: file_size,
		// 	format: extension,
		// 	tags: req.body.tags,
		// }
		// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=");
		// console.log("header",req.headers);
		// console.log('filename',filename)
		// console.log('originalname',originalname);
		// console.log('extension',extension);
		// console.log('file_size',file_size);
		// console.log('size===>',file_size);
		// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=");

//
		const add_asset = await asset.add({
			workspace: req.workspace,
			name: filename ?? 'undefined',
			url: process.env.SPACE_DOMAIN + originalname,
			size: file_size,
			format: extension,
			tags:'MASFOB'
		})



		res.status(200).json({
			success: true,
			message: 'Asset added successfully ',
			data: add_asset,
		})
	} catch (error) {
            console.error(error);
            next(error);
        }
});

router.post('/add/indpage', uploadfile, async (req, res, next) => {
	try {
		const { filename } = req.body
		const { originalname } = req.file
		const extension = req.extension.slice(1)

		const file_size = await getFileSize(originalname)

		const add_asset = await asset.add({
			workspace: req.workspace,
			name: filename ?? 'undefined',
			url: process.env.SPACE_DOMAIN + originalname,
			size: file_size,
			format: extension,
			tags: req.body.tags,
		})
		// console.log('#########')
		// console.log(add_asset)
		// console.log('#########')

		res.status(200).json({
			success: true,
			message: 'Asset added successfully ',
			data: add_asset,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

router.post(
	'/reference/add',
	attestation,
	authorization,
	async (req, res, next) => {
    // console.log("#########################################################################################################################################");
	// console.log(req.headers)
	// console.log("#########################################################################################################################################");

		try {
			const assetData = req.body
			assetData.workspace = req.workspace

		//	console.log(assetData)
			const add_asset = await asset.add({
				workspace: req.workspace,
				name: req.body.name,
				url: req.body.url,
				size: req.body.size,
				format: req.body.format,
				tags: req.body.tags,
			})
			res.status(200).json({
				success: true,
				message: 'Asset reference Added successfully ',
				data: { _id: add_asset._id },
			})
		} catch (error) {
			// console.error(error)
			// res.status(500).json({ success: false, message: error.message, error })
			next(error)
		}
	}
)

router.post('/list', authorization, async (req, res, next) => {
	try {
	//	console.log("111111111111",req.body);
		const workspace = req.workspace
		//const tags=req.body.tags||'MASFOB'
		const tags=req.body.tags 
		const list_assets = await asset.list({ workspace,tags })
	//	console.log("list_assets",list_assets);
		res.status(200).json({
			success: true,
			message: 'Asset Listed successfully ',
			data: list_assets,
		})
	} catch (error) {
		// console.error(error)
		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

router.post('/fetch', authorization, async (req, res, next) => {
    try {
    //    console.log("Request body:", req.body);
        const workspace = req.workspace;
        const filename = req.body.filename;
		
        // console.log("Workspace:", workspace);
        // console.log("Filename:", filename);
    
        const list_assets = await asset.fetch({ workspace, filename });
      //  console.log("Fetched assets:", list_assets);
        
        res.status(200).json({
            success: true,
            message: 'Asset Listed successfully',
            data: list_assets,
        });
    } catch (error) {
        console.error("Error in route handler:", error);
        next(error);
    }
});


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

router.post('/delete', authorization, async (req, res, next) => {
	try {
		const workspace = req.workspace
		const asset_id = req.body.asset_id
		const url = req.body.url
	//	console.log('Asset to delete:', asset_id)

		//remove from s3 before use s3 delete functions
		const delete_asset = await asset.delete({ workspace, asset_id, url })

		res.status(200).json({
			success: true,
			message: 'Asset Deleted successfully ',
			//data: result,
		})
	} catch (error) {
		// console.error(error)

		// res.status(500).json({ error: 'Internal Server Error' })
		next(error)
	}
})

module.exports = router
