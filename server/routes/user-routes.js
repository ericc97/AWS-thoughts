const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const awsConfig = {
	region: 'east-us-2',
};

//configure the service interface object to connect with the local DynamoDB instance
// Use DocumentClient class to use native javascript objects to interface with the dynamodb service object. 
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';

// GET all Thoughts
router.get('/users', (req,res) => {
	const params = {
		TableName: table,
	}
	// Scan database return all items in the table
	dynamodb.scan(params, (err, data) => {
		if (err) {
			res.status(500).json(err); // an error occurred
		}else {
			res.json(data.Items);
		}
	})
});

// GET all Thoughts from a user
router.get('/users/:username', (req,res) => {
	console.log(`Querying for thought(s) from ${req.params.username}.`);
	// Declare params to define query call to dynamodb
	const params = {
		TableName: table,
		KeyConditionExpression: '#un = :user', // Specifies search criteria
		ExpressionAttributeNames: {
			'#un': 'username',
			'#ca': 'createdAt',
			'#th': 'thought',
			'#img': 'image'
		},
		ExpressionAttributeValues: {
			':user': req.params.username
		},
		ProjectionExpression: '#un, #th, #ca, #img', // This determines which attribute or column will be returned
		ScanIndexForward: false // Default is true which specifies the order for the sort key, which will be ascending
		// The sort key was assigned to the createdAt attribute when we first created the table
		// WE want most recent posts on top, we set the property to false so that order is descending
	};

	// Make database call to Thoughts table
	dynamodb.query(params, (err,data) => {
		if (err) {
			console.error('Unable to query. Error:', JSON.stringify(err, null ,2));
			res.status(500).json(err); //an error occurred
		}else {
			console.log('Query succeeded.');
			res.json(data.Items)
		}
	});
});

// POST create new user
router.post('/users', (req,res) => {
	const params = {
		TableName: table,
		Item: {
			username: req.body.username,
			created: Date.now(),
			thought: req.body.thought,
			image: req.body.image // add image attribute
		}
	};
	// Database call 
	dynamodb.put(params, (err,data) => {
		if (err) {
			console.error('Unable to add your thought. Error JSON:', JSON.stringify(err, null, 2));
			res.status(500).json(err); // an error occurred
		}else {
			console.log("Added thought:", JSON.stringify(data, null, 2));
			res.json({'Added': JSON.stringify(data, null, 2)});
		}
	})
});

module.exports = router;