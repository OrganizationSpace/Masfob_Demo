require('dotenv').config()
const multer = require('multer')
const multers3 = require('multer-s3')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const path = require('path')

const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

// Function to upload a file to S3 and return the URL
async function uploadFileToS3AndReturnURL(fileData) {
	try {
		const upload = multer({
			storage: multers3({
				s3: s3,
				bucket: process.env.BUCKET_NAME,
				contentType: multers3.AUTO_CONTENT_TYPE,
				acl: 'public-read',
				metadata: (req, file, cb) => {
					cb(null, {
						fieldname: file.fieldname,
					})
				},
				key: (req, file, cb) => {
					cb(null, file.originalname)
				},
			}),
			fileFilter: function (req, file, callback) {
				var ext = path.extname(file.originalname)
				req.extension = ext

				if (
					ext !== '.png' &&
					ext !== '.jpg' &&
					ext !== '.jpeg' &&
					ext !== '.pdf' &&
					ext !== '.mp4' &&
					ext !== '.mp3' &&
					ext !== '.aac' &&
					ext !== '.amr' &&
					ext !== '.wav' &&
					ext !== '.ogg' &&
					ext !== '.mov' &&
					ext !== '.avi' &&
					ext !== '.mkv' &&
					ext !== '.doc' &&
					ext !== '.docx' &&
					ext !== '.xls' &&
					ext !== '.xlsx' &&
					ext !== '.ppt' &&
					ext !== '.pptx' &&
					ext !== '.txt' &&
					ext !== '.rtf' &&
					ext !== '.csv' &&
					ext !== '.key' &&
					ext !== '.gif' &&
					ext !== '.bmp'
				) {
					return callback(new Error('Unsupported file format'))
				}
				callback(null, true)
			},
			// limits: {
			// 	fileSize: 20 * 1024 * 1024 ,
			// },
		}).single('file')

		// Simulate the request and response objects to call the S3 upload middleware
		const req = { file: fileData }
		const res = {
			status: (statusCode) => ({
				json: ({ Location }) => {
					// Location contains the URL of the uploaded file
					return Location
				},
			}),
		}

		// Call the S3 upload middleware
		const uploadedUrl = await new Promise((resolve, reject) => {
			upload(req, res, (err) => {
				if (err) {
					console.error('Error uploading to S3:', err)
					reject('Failed to upload file to S3')
				} else {
					// The URL is returned in the response
					resolve(res.status(200).json({ Location: res.status().Location }))
				}
			})
		})

		return uploadedUrl
	} catch (error) {
		console.error('Error in uploadFileToS3AndReturnURL:', error)
		throw new Error('Failed to upload file to S3')
	}
}

module.exports = uploadFileToS3AndReturnURL
