const { query } = require('../../DB/db');
const RESULT = {
    success: 'SUCCESS',
    error: "ERROR"
}

exports.goodsList = async(req, res) => {
    let sql = 'select * from goods';
    let result = await query(sql);
    if (result.length >= 1) {
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
exports.orderedList = async(req, res) => {
    let sql = 'insert into order_list set name = ? , pic = ? , category = ? , description = ? , cost = ? , price = ? , count = ? , totalPrice = ? , profit = ? , c_time = ?';
    // let sqlArr = Object.values(req.body);
    let searchData = JSON.parse(Object.keys(req.body)[0])
    let sqlArr = searchData.map((item) => {
        return [
            item.name,
            item.pic,
            item.category,
            item.description,
            item.cost,
            item.price,
            item.count,
            item.totalPrice,
            item.profit,
            item.c_time
        ]
    })
    let sign = true;
    for (let i = 0; i < sqlArr.length; i++) {
        let result = await query(sql, sqlArr[i]);
        if (result.affectedRows == 1) {
            continue;
        } else {
            sign = false;
            break;
        }
    }
    if (sign) {
        res.send({
            state: RESULT.success,
            data: '下单成功,订单已经生成'
        })
    } else {
        res.send({
            state: RESULT.error,
            data: '下单失败'
        })
    }

}