// const multer = require('multer')
// const multers3 = require('multer-s3')
// const { S3Client } = require('@aws-sdk/client-s3')
// const path = require('path')

// const s3 = new S3Client({
// 	endpoint: 'https://sgp1.digitaloceanspaces.com',
// 	region: 'sgp1',
// 	credentials: {
// 		accessKeyId: 'PXYNBVQM66Y637OVRTBR',
// 		secretAccessKey: 'C19b0MxmnEd7RXCa2LI15QEMi53QfUI/xFB7Fo3dP+g',
// 	},
// })

// const upload = multer({
// 	storage: multers3({
// 		s3: s3,
// 		bucket: 'mindvision',
// 		contentType: multers3.AUTO_CONTENT_TYPE,
// 		acl: 'public-read',
// 		metadata: (req, file, cb) => {
// 			cb(null, {
// 				fieldname: file.fieldname,
// 			})
// 		},
// 		key: (req, file, cb) => {
// 			cb(null, file.originalname)
// 		},
// 	}),
// 	fileFilter: function (req, file, callback) {
// 		var ext = path.extname(file.originalname)
// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
// console.log("extenstion======----->",req.extension);
// console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");

// 		req.extension = ext

// 		if (
// 			ext !== '.png' &&
// 			ext !== '.jpg' &&
// 			ext !== '.jpeg' &&
// 			ext !== '.pdf' &&
// 			ext !== '.mp4' &&
// 			ext !== '.mp3' &&
// 			ext !== '.aac' &&
// 			ext !== '.amr' &&
// 			ext !== '.wav' &&
// 			ext !== '.ogg' &&
// 			ext !== '.mov' &&
// 			ext !== '.avi' &&
// 			ext !== '.mkv' &&
// 			ext !== '.doc' &&
// 			ext !== '.docx' &&
// 			ext !== '.xls' &&
// 			ext !== '.xlsx' &&
// 			ext !== '.ppt' &&
// 			ext !== '.pptx' &&
// 			ext !== '.txt' &&
// 			ext !== '.rtf' &&
// 			ext !== '.csv' &&
// 			ext !== '.key' &&
// 			ext !== '.gif' &&
// 			ext !== '.bmp'
// 		) {
// 			return callback(new Error('Unsupported file format'))
// 		}
// 		callback(null, true)
// 	},
// 	// limits: {
// 	// 	fileSize: 20 * 1024 * 1024,
// 	// },
// }).single('file')

// module.exports = upload
