const multer = require('multer');

function fileSize(req, res, next) {
    const upload = multer().single('file');

    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }
        // console.log("-------------------------------------------------------------------------------");
        // console.log("req.fileData------>", req.file);
        // console.log("req.fileSize------>", req.file.size);
        // console.log("-------------------------------------------------------------------------------");
        next();
    });
}


// const formidable = require('formidable');

// const fileSize = (req, res, next) => {
  
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             console.error('Error parsing the file:', err);
//             return res.status(400).json({ error: 'Error parsing the file' });
//         }
//         console.log("----------------------------------------------------------------------------------------------");
//         console.log("files",files);
//         console.log("files.file",files.file);
//         console.log("----------------------------------------------------------------------------------------------");

//         if (!files || !files.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const uploadedFile = files.file[0];
//         const { originalFilename, mimetype, size } = uploadedFile;

//         req.fileSize = size
//         req.file
//         console.log("111111111111111111111111111111111111111111111111111111111111");
//         console.log("size",size);
//         console.log("req.fileSize",req.fileSize);
//         console.log("111111111111111111111111111111111111111111111111111111111111");
//         // req.uploadedFile = {
//         //     filename: name,
//         //     mimetype: type,
//         //     size: size,
//         //     path: uploadedFile.path // If you need the path to the uploaded file
//         // };
        
//         // Call next to pass control to the next middleware or route handler
//         next();
//     });
// };



module.exports = fileSize;
