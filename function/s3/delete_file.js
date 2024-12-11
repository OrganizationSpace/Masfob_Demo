const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

// Initialize the S3 client with your configuration
const s3 = new S3Client({
	endpoint: 'https://sgp1.digitaloceanspaces.com',
	region: 'sgp1',
	credentials: {
		accessKeyId: 'PXYNBVQM66Y637OVRTBR',
		secretAccessKey: 'C19b0MxmnEd7RXCa2LI15QEMi53QfUI/xFB7Fo3dP+g',
	},
})

// Function to delete a file from an S3 bucket
async function deleteFile(objectKey) {
	try {
		// Create a DeleteObjectCommand to delete the specified object
		const deleteObjectCommand = new DeleteObjectCommand({
			Bucket: 'mindvision',
			Key: objectKey,
		})

		// Execute the command to delete the object
		await s3.send(deleteObjectCommand)
		return true

		console.log(`File '${objectKey}' deleted successfully`)
	} catch (error) {
		console.error(`Error deleting file '${objectKey}':`, error)
		return false
	}
}

// Export the deleteFile function so it can be used in other modules
module.exports = deleteFile
