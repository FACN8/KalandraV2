const fs = require('fs');
const path = require('path');
const dbConnection = require('./db_connection');
const sqlPath = path.join(__dirname, 'db_build.sql');
const sql = fs.readFileSync(sqlPath).toString();


const runDbBuild = (cb) => dbConnection.query(sql, cb);

if (process.env.NODE_ENV) {
    runDbBuild();
    console.log('Database built');
}

module.exports = runDbBuild