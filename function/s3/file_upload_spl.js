const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')
// ... (other imports and setup)

const s3 = new S3Client({
	endpoint: 'https://sgp1.digitaloceanspaces.com',
	region: 'sgp1',
	credentials: {
		accessKeyId: 'PXYNBVQM66Y637OVRTBR',
		secretAccessKey: 'C19b0MxmnEd7RXCa2LI15QEMi53QfUI/xFB7Fo3dP+g',
	},
})

// Function to upload an image to S3
const uploadImageToS3 = async (imageData) => {
	try {
		var asset_temp_name = uuidv4() + uuidv4()
		var extension = '.' + imageData.mimetype.split('/').pop()
		const params = {
			Bucket: 'mindvision', // Replace with your bucket name
			Key: asset_temp_name + extension, // Replace with the desired file key
			Body: imageData.buffer, // Use the buffer from the image data
			ContentType: imageData.mimetype,
			ACL: 'public-read',
		}
		const command = new PutObjectCommand(params)

		const response = await s3.send(command)
		console.log(response.$metadata)

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
