
/* Copyright 2020 abreums
Permission to use, copy, modify, and/or distribute this software for any purpose 
with or without fee is hereby granted, provided that the above copyright notice 
and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, 
OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, 
DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, 
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

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
