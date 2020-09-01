'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "CorongaTracker",
        Item: {
            id: '2954fa39cabd5c448a1154f28565b908',
            timestamp: '1598972400',
            latitude: "-25.4246665",
            longitude: "-49.270205"
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err) {
        responseBody = `Falha na criação do produto: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
};