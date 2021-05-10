const { query } = require('../../DB/db');


// let select = async(req, res) => {
//     let sql = 'select * from admin';
//     const result = await query(sql);
//     console.log(result);
// }
// select();

const RESULT = {
    success: 'SUCCESS',
    error: 'ERROR'
}
async function findName(sqlArr) {
    let sql = 'select * from admin where name = ?'
    let result = await query(sql, sqlArr);
    console.log(result.length)
    if (result.length != 0) {
        return true;
    } else {
        return false;
    }
}


exports.login = async(req, res) => {
    let sql = 'select * from admin where name=? and password=?';
    let sqlArr = [req.body.name, req.body.password];
    let result = await query(sql, sqlArr);
    if (result.length) {
        console.log(result)
        res.send({
            state: RESULT.success,
            // data: result[0]
        })
    } else {
        res.send({
            state: RESULT.error
        })
    }
}
exports.adminList = async(req, res) => {
    let sql = 'select * from admin';
    let result = await query(sql);
    if (result.length) {
        // console.log(result)
        result.forEach(item => {
            delete item.uid;
        })
        res.send({
            state: RESULT.success,
            data: result,
        })
    } else {
        console.log({
            state: RESULT.error
        })
    }
}
exports.updateAdmin = async(req, res) => {
    let sql = 'update admin set password = ? ,tel = ? , id = ? , power = ? where name = ?';
    let sqlArr = Object.values(req.body);
    let temp = sqlArr.shift();
    sqlArr.push(temp)
    console.log(sqlArr)
    let result = await query(sql, sqlArr);
    console.log(result)
    if (result.affectedRows == 1) {
        res.send({
            state: RESULT.success,
            data: '修改成功'
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '修改失败'
        })
    }

}
exports.addAdmin = async(req, res) => {
    let sql = 'insert into admin set name = ? , password = ? ,tel = ? , id = ? , power = ?';
    let sqlArr = Object.values(req.body);
    // console.log(req.body)
    if (!await findName([req.body.name])) {
        let result = await query(sql, sqlArr);
        console.log(result)
        res.send({
            state: RESULT.success,
            data: '添加成功'
        })
        return;
    }
    if (await findName([req.body.name])) {
        res.send({
            state: RESULT.error,
            data: '添加失败,用户名已经存在'
        })
        return;
    }

}

exports.adminListByCondition = async(req, res) => {
    let sql = 'select * from admin where power = ?'
    let sqlArr = [req.query.power]
    let result = await query(sql, sqlArr);

    if (result.length > 0) {
        result.forEach((item) => {
            delete item.uid
        });
        res.send({
            state: RESULT.success,
            data: result
        })
    } else {
        res.send({
            state: RESULT.success,
            data: result
        })
    }
    // let sqlArr = req.body
    // console.log(11111111)
    // console.log(Object.keys(req))
    console.log(req.query)
}
exports.deleteAdmin = async(req, res) => {
    let sql = 'delete from admin where name = ?';
    let sqlArr = [req.body.name];
    let result = await query(sql, sqlArr);
    if (result.affectedRows == 1) {
        res.send({
            state: RESULT.success,
            data: '删除成功'
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '删除失败'
        })
    }
}