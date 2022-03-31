// Load the AWS SDK for node.js (allows app to communicate with the web service)
const AWS = require('aws-sdk');
// import uuid
const { v4: uuidv4 } = require('uuid');
// Set region
AWS.config.update({ region: 'us-east-1 '});
// Create S3 service object 
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// Create parameters for calling createBucket
var bucketParams = {
	Bucket: 'user-images-' + uuidv4(),
};
// Call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Success')
	}
});
