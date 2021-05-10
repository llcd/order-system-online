let { query } = require('../../DB/db');

const RESULT = {
    success: 'SUCCESS',
    error: "ERROR"
}

async function findGoods(sqlArr) {
    let sql = 'select * from goods where name = ?';
    let result = await query(sql, sqlArr);
    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
}

exports.goodsList = async(req, res) => {
    let sql = 'select * from goods';
    let result = await query(sql);
    if (result.length >= 1) {
        // result.forEach(item => {
        //     delete item.uid;
        // });
        res.send({
            state: RESULT.success,
            data: result
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '无数据'
        })
    }
}
exports.addGoods = async(req, res) => {
    let sql = 'insert into goods set name = ? , img = ? , category = ? , description = ? , cost = ? , price = ?';
    let sqlArr = Object.values(req.body);
    if (!await findGoods([req.body.name])) {
        let result = await query(sql, sqlArr);
        if (result.affectedRows == 1) {
            res.send({
                state: RESULT.success,
                data: '添加成功'
            })
        } else {
            res.send({
                state: RESULT.error,
                data: '添加失败'
            })
        }
    } else {
        res.send({
            state: RESULT.error,
            data: "添加失败,当前菜名已经存在"
        })
    }
}

exports.updateGoods = async(req, res) => {
    let sql = 'update goods set name = ? , img = ? , category = ? , description = ? , cost = ? , price = ? where uid = ?';
    let sqlArr = Object.values(req.body)
        // console.log(req.body)
    let temp = sqlArr.shift();
    sqlArr.push(temp)

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
    // if (!await findGoods([req.body.name])) {

    // } else {
    //     res.send({
    //         state: RESULT.error,
    //         data: '菜品已经存在,请核查...'
    //     })
    // }
}

exports.deleteGoods = async(req, res) => {
    let sql = 'delete from goods where uid = ?';
    let sqlArr = Object.values(req.body);
    console.log(sqlArr)
    let result = await query(sql, sqlArr);
    if (result.affectedRows == 1) {
        res.send({
            state: RESULT.success,
            data: "删除成功"
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '删除失败'
        })
    }
}

exports.orderedList = async(req, res) => {
    let sql = 'select * from order_list';
    let result = await query(sql);
    console.log(result)
    if (result.length) {
        res.send({
            state: RESULT.success,
            data: result,
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '没有查到数据'
        })
    }
}
exports.changeOrderState = async(req, res) => {
    let sql = 'update order_list set state = ? where uid = ?';
    let sqlArr = Object.values(req.body);
    // console.log(sqlArr);
    // res.send('ok')

    let result = await query(sql, sqlArr);
    if (result.affectedRows == 1) {
        res.send({
            state: RESULT.success,
            data: '订单已完成',
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '订单状态变更失败'
        })
    }
}