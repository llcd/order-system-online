const express = require('express');
const bodyParser = require('body-parser');
const admin = require('./routes/admin/index')
const goods = require('./routes/goods/index')
const user = require('./routes/user/index')

const listenningPort = 3000;
const app = express();
//自定义跨域
var allowCors = function(req, res, next) {
    // console.log(req)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == "OPTIONS") res.sendStatus(200); /*让options请求快速返回*/
    else next();
};
var jsonParser = bodyParser.json()
app.use(allowCors); //使用跨域中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(jsonParser)



app.use(admin);
app.use(goods);
app.use(user)

app.listen(listenningPort, () => {
    console.log('the serve is set up successfully.....');
    console.log('the listenning port is:' + listenningPort);
})