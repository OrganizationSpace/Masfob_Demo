const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3')

// Initialize the S3 client with your configuration
const s3 = new S3Client({
	endpoint: 'https://sgp1.digitaloceanspaces.com',
	region: 'sgp1',
	credentials: {
		accessKeyId: 'PXYNBVQM66Y637OVRTBR',
		secretAccessKey: 'C19b0MxmnEd7RXCa2LI15QEMi53QfUI/xFB7Fo3dP+g',
	},
})

// Function to get the size of a file in an S3 bucket
async function getFileSize(objectKey) {
	try {
		// Create a HEAD object command to retrieve metadata
		const headObjectCommand = new HeadObjectCommand({
			Bucket: 'mindvision',
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
