const express = require('express');
const router = express.Router();
// Use Multer package to provide middleware for handling uploading files
const multer = require('multer');
const AWS = require('aws-sdk');
const paramsConfig = require('../utils/params-config');

// Create temp storage container that will hold image files until ready to be uploaded to the s3 bucket
const storage = multer.memoryStorage({
	destination: function (req, file, callback) {
		callback(null, '');
	}
});

// Declare upload object which contains the storage destination and the key (image)
// image is they key
const upload = multer({ storage }).single('image');

// Instantiate s3 to communicate with the s3 web service to upload the image to the s3 bucket
const s3 = new AWS.S3({
	apiVersion: '2006-03-01'
});

// Create image upload route
router.post('/image-upload', upload, (req,res) => {
	console.log("post('/api/image-upload", req.file);
	// set up params config
	const params = paramsConfig(req.file);
	// set up S3 service call
	s3.upload(params, (err, data) => {
		if (err){
			console.log(err);
			res.status(500).send(err);
		}
		res.json(data);
	})
});

module.exports = router;