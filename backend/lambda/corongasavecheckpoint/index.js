
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

'use strict';
const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
const uuid = require('uuid');

exports.handler = async (event, context) => {
    
    let responseBody = "";
    let statusCode = 200;

    // Set up AWS
    AWS.config.update({
        region: 'sa-east-1'
    });

    try {
        // Use a local DB for the example.
        const ddb = new AWS.DynamoDB();
        console.log("coronga Save");
    
        // Obtém configuração de acesso a tabela corongaTracker através do GeoDataManager
        const DDB_TABLENAME = 'corongaTracker';
        const config = new ddbGeo.GeoDataManagerConfiguration(ddb, DDB_TABLENAME);
        // Instacia o gerenciador da tabela
        const corongaManager = new ddbGeo.GeoDataManager(config);
        
        const { id, latitude, longitude, timestamp } = JSON.parse(event.body);
        const lat = parseFloat(latitude).toFixed(4);
        const lon = parseFloat(longitude).toFixed(4);

        const data = await corongaManager.putPoint({
                RangeKeyValue: { S: uuid.v4() }, // Gera hash para garantir a unicidade da chave.
            GeoPoint: { // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
                latitude: lat,
                longitude: lon
            },
            PutItemInput: { // Passed through to the underlying DynamoDB.putItem request. TableName is filled in for you.
                Item: { // The primary key, geohash and geojson data is filled in for you
                    userId: { S: id }, // Specify attribute values using { type: value } objects, like the DynamoDB API.
                    timestamp: { S: timestamp }
                },
                // ... Anything else to pass through to `putItem`, eg ConditionExpression
            }
        }).promise()
        .then(function() { console.log('Done!') });
    } catch(err) {
        responseBody = `Falha na criação do produto: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin":"*"
        },
        body: responseBody
    };
    return response;
};
