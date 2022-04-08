const AWS = require('aws-sdk');

AWS.config.update({
	region: 'us-east-2'
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


// create the params object
const params = {
	// set table name as 'Thoughts'
	TableName: 'Thoughts',
	// KeySchema property defines the partition key and the sort key
	KeySchema: [
		{ AttributeName: 'username', KeyType: 'HASH' }, // Partition Key
		{ AttributeName: 'createdAt', keyType: 'RANGE' }, //Sort Key
	],
	// AttributeDefinitions property defines the attributes we've used for hash and range keys... Assigned String to username and Number to createdAt
	AttributeDefinitions: [
		{ AttributeName: 'username', AttributeType: 'S' },
		{ AttributeName: 'createdAt', AttributeType: 'N' },
	],
	// Provisionedthroughput setting reserves a max read and write capacity of the database
	ProvisionedThroughput: {
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10,
	}
}

dynamodb.createTable(params, (err, data) => {
	if (err) {
		console.error(
			'Unable to create table. Error JSON:',
			JSON.stringify(err, null, 2)
		);
	}else {
		console.log(
			'Created table. Table description JSON',
			JSON.stringify(data, null, 2)
		)
	}
});