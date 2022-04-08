const { config } = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Declare params function 
const params = (fileName) => { // Params function receives a parameter called fileName
	const myFile = fileName.originalname.split('.');
	const fileType = myfile[myfile.length - 1];

	const imageParams = {
		Bucket: config.bucket,
		Key: `${uuidv4()}.${fileType}`,
		Body: fileName.buffer,
		ACL: 'public-read' // allow read access to this file
	};
	return imageParams;
}

module.exports = params;