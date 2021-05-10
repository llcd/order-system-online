// let mysql = require('mysql');

// let connection = mysql.createConnection({
//     user: 'root',
//     password: 'root',
//     database: 'order',
//     host: 'localhost',
//     port: '3306'
// });


const config = {
    user: 'root',
    password: 'root',
    database: 'order',
    host: 'localhost',
    port: '3306'
}
module.exports = config;







// connection.connect();


// let sql = 'select * from admin';

// // let sql = "insert into admin(name,password,tel,id,power) values(?,?,?,?,?)";
// let sqlArr = ['lc', '123456', '13129885812', '41132819980158552X', '超级管理员']

// connection.query(sql, sqlArr, function(err, result, field) {
//     if (err) {
//         throw err;
//     }
//     console.log(result)
// })