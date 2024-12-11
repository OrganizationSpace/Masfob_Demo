require('dotenv').config()
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')
// ... (other imports and setup)

const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

// Function to upload an image to S3
const uploadImageToS3 = async (imageData) => {
	try {
		var asset_temp_name = uuidv4() + uuidv4()
		var extension = '.' + imageData.mimetype.split('/').pop()
		const params = {
			Bucket: process.env.BUCKET_NAME, // Replace with your bucket name
			Key: asset_temp_name + extension, // Replace with the desired file key
			Body: imageData.buffer, // Use the buffer from the image data
			ContentType: imageData.mimetype,
			ACL: 'public-read',
		}
		const command = new PutObjectCommand(params)

		const response = await s3.send(command)
	//	console.log(response.$metadata)

		//await s3.putObject(params).promise()

		// Generate a signed URL for the uploaded image
		// Generate the signed URL

		return process.env.SPACE_DOMAIN + asset_temp_name + extension
	} catch (error) {
		console.error('Error uploading to S3:', error)
		throw new Error('Internal Server Error')
	}
}

module.exports = uploadImageToS3
