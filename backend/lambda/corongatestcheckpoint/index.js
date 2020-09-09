
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

exports.handler = async (event, context) => {
    
    let responseBody = "";
    let statusCode = 200;
    let risco = false;

    // Set up AWS
    AWS.config.update({
        region: 'sa-east-1'
    });

    try {
        // Use a local DB for the example.
        const ddb = new AWS.DynamoDB();
        // Obtém configuração de acesso a tabela corongaTracker através do GeoDataManager
        const DDB_TABLENAME = 'corongaTracker';
        const config = new ddbGeo.GeoDataManagerConfiguration(ddb, DDB_TABLENAME);
        // Instacia o gerenciador da tabela
        const corongaManager = new ddbGeo.GeoDataManager(config);
       
        const { latitude, longitude, timestamp } = JSON.parse(event.body);
        const lat = parseFloat(latitude);
        const lonn = parseFloat(longitude);
        
        const query = {
            RadiusInMeter: 80,
            CenterPoint: {
                latitude: lat,
                longitude: lonn
            }
        };
        
        await corongaManager.queryRadius(query)
        .then((locations) => {
            if (locations.length != 0) {
                risco = true;
            }
            responseBody = `Risco: ${risco}`;
        });
            
    } catch(err) {
        console.log('Exception!');
        responseBody = `Falha na busca do produto: ${err}`;
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
