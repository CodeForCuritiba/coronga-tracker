'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "CorongaTracker",
        Key: {
            id: '2954fa39cabd5c448a1154f28565b908',
        }
    }

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch(err) {
        responseBody = `Falha na deleção do produto: ${err}`;
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