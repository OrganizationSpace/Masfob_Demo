const zlib = require('zlib')

const decrypt = async (req, res, next) => {
    try {

      
        const encodedString = req.body.encodedString;
        const decodedBuffer = Buffer.from(encodedString, 'base64');

        // console.log("#################################################################");
        // console.log("encodedString-------=======>",encodedString);
        // console.log("##########################################################################");

        const decompressedBuffer = await new Promise((resolve, reject) => {
            zlib.gunzip(decodedBuffer, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const decodedString = decompressedBuffer.toString('utf-8');
        req.decryptedData = JSON.parse(decodedString); 
        
        next(); 
    } catch (error) {
        next(error);
    }
};



const encrypt = async (data) => {
	try {
		const jsonData = JSON.stringify(data)
		const compressedData = zlib.gzipSync(jsonData)
		const encodedData = compressedData.toString('base64')
		return encodedData
	} catch (error) {
		console.error('Encryption error:', error)
		throw error
	}
}
module.exports = { decrypt, encrypt }