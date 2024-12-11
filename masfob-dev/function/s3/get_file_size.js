require('dotenv').config()
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3')

// Initialize the S3 client with your configuration
const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})

// Function to get the size of a file in an S3 bucket
async function getFileSize(objectKey) {
	try {
		// Create a HEAD object command to retrieve metadata
		const headObjectCommand = new HeadObjectCommand({
			Bucket: process.env.BUCKET_NAME,
			Key: objectKey,
		})

		// Execute the command to get metadata (including file size)
		const data = await s3.send(headObjectCommand)

		// Extract and return the file size in bytes
		return data.ContentLength
	} catch (error) {
		console.error('Error getting file size:', error)
		throw error
	}
}

// Export the getFileSize function so it can be used in other modules
module.exports = getFileSize
