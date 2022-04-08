const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
	region: 'us-east-2',
});
// documentClient is used to create the dynamo service object.. allows the use of Javascript objects as arguments and return js types
const dynamodb = new AWS.DynamoDB.DocumentClient({
	apiVersion: '2012-08-10',
});

// use fs to read users.json file and assign the object to the allUsers constant
console.log('importing thoughts into DynamoDB. please wait.');
const allUsers = JSON.parse(
	fs.readFileSync('./server/seed/users.json', 'utf8'),
);

// Loop over allUsers array and create the params object
allUsers.forEach(user => {
	const params = {
		tableName: 'Thoughts',
		Item: {
			'username': user.username,
			'createdAt': user.createdAt,
			'thought': user.thought
		}
	}
	// Make call to database with the service interface object
	dynamodb.put(params, (err, data) => {
		if (err) {
			console.error('Unable to add thought', user.username, '. Error JSON:', JSON.stringify(err, null, 2));
		} else {
			console.log('PutItem succeeded', user.username);
		}
	})
})