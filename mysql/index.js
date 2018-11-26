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
                console.log("服务器启动失败");
                throw (err)
            } else {
                console.log("服务器启动成功");
            }
        });
    }
    /**
     * 查询表中所有数据
     */
    selectAll() {
        return new Promise((resovle, reject) => {
            this.SQL.query('SELECT * FROM users', function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    /**
     * 查询
     * @param {int} id 查询的id
     */
    select(account) {
        return new Promise((resovle, reject) => {
            this.SQL.query(`SELECT * FROM users WHERE account = ?`, [account], function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    /**
     * 新增行数据
     * @param {object} data 新增数据
     */
    insert(data) {
        return new Promise((resovle, reject) => {
            this.SQL.query('INSERT INTO users SET ?', data, function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    /**
     * 修改表 添加列
     * @param {CHAR} name 列名称
     * @param {CHAR} type 字段类型
     */
    insertColumn(name, type) {
        return new Promise((resovle, reject) => {
            this.SQL.query(`ALTER TABLE users ADD ${name} ${type}`, function(err, result) {
                if (err) throw err;
                resovle(result);
            });
        })
    }
    /**
     * 删除行数据
     * @param {int} id 需要删除行的id
     */
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