let mysql = require('mysql');
let config = require('../config/default.js');
class SQLTOOL {
    constructor(sql) {
        this.SQL = this.create(sql);
        this.connect();
    }
    create(sql) {
        return sql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            port: config.port,
            database: config.database
        });
    }
    connect() {
        this.SQL.connect(function (err) {
            if (err) {
                console.log("链接失败");
                throw (err)
            } else {
                console.log("链接成功");
            }
        });
    }
    selectAll() {
        return new Promise((resovle, reject) => {
            this.SQL.query('SELECT * FROM users', function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    select(id) {
        return new Promise((resovle, reject) => {
            this.SQL.query(`SELECT * FROM users WHERE id=${id}`, function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    insert(data) {
        return new Promise((resovle, reject) => {
            this.SQL.query('INSERT INTO users SET ?', data, function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    delete(id) {
        return new Promise((resovle, reject) => {
            this.SQL.query(`DELETE FROM users WHERE id = ${id}`, function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
}
module.exports = new SQLTOOL(mysql);