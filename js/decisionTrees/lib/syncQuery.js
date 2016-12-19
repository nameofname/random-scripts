"use strict";


const mysql = require('mysql');
const dbConfig = require('../config/database');
const connection = mysql.createConnection(dbConfig);

const _query = (q) => {
    return new Promise((resolve, reject) => {
        connection.query(q, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = async (q) => {
    return await _query(q);
};

