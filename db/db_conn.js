var mysql = require('mysql');
var config = require('./db_info').local;

module.exports = function () {
    return {
        local: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            })
        }
    }
};