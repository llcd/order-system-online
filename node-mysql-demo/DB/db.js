let mysql = require('mysql');
let config = require('./config');


// console.log(config)


function connection() {
    return mysql.createConnection({
        port: config.port,
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
}

function query(sql, sqlArr) {
    let conn = connection();
    return new Promise((resolve, reject) => {
        console.log('sql语句:' + sql);
        try {
            conn.query(sql, sqlArr, function(err, result, fields) {
                if (err) {
                    reject(err);
                    console.log('数据可操作失败:' + JSON.stringify(err));
                    return;
                } else {
                    resolve(result);
                    console.log('数据库操作成功:' + JSON.stringify(result))
                }

            })
        } catch (error) {
            reject(err)
        } finally {
            conn.end();
        }
    })
}

module.exports = { query }