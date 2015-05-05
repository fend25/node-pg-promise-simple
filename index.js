'use strict';
var pg = require('pg');
module.exports = {
    pg: pg,
    connect: function (connectionString) {
        return new Promise(function (resolve, reject) {
            pg.connect(connectionString, function (error, client, done) {
                if (error) reject(error);
                else {
                    client.query_with_callback = client.query;
                    client.query = function (statement, values) {
                        return new Promise(function (resolve, reject) {
                            client.query_with_callback(statement, values, function (innerError, result) {
                                if (innerError) reject(innerError);
                                else resolve(result);
                            });
                        });
                    };
                    resolve({client: client, done: done});
                }
            });
        });
    }
};