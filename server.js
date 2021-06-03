const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());

// What id Does ?
// 1 - make upload folder publically available
// 2 - files can be access by http://localhost:4000/upload/filename

// Why this is not suggested
// 1 - assume you are building robust api and contains enormous routes
// 2 - route to http://localhost:4000/upload can become problematic in future as this looks as another route for an api

app.use('/upload', express.static('upload'));

// Manual definiation of file upon upload including desition and desired filename
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './upload');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	},
});

// limit uploading file size to 2 mb
const fileSize = 1024 * 1024 * 2;

const fileFilter = (req, file, cb) => {
    // reject a file or accept a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
    
};

const upload = multer({ storage: multerStorage, limits:{fileSize}, fileFilter });


// Upload image to server
app.post('/imageUpload', upload.single('image'), (req, res, next) => {
    

    if (req.file !== undefined) {
       res.status(201).send({
			message: 'You have reached imageUpload Route',
			file: req.file.path,
		}); 
    } else {
        res.status(400).send({
			message: 'Please upload only jpeg | jpg | png',
		});
    }
		
});

// Access server files via api end point 
app.get('/getFile/:filename', (req, res) => {

    const fileName = req.params.filename;

    if (!fileName || fileName === undefined) {
		res.status(400).send({
			message: 'filename is required',
		});
	} else {
		res.status(200).sendFile(`${path.join(__dirname, 'upload', fileName)}`);
	}
});


app.listen(4000, () => console.log('listening on port 4000'));

