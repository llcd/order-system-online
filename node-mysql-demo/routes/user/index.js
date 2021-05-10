const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/user/goodslist', service.goodsList);
router.post('/user/goodslist/orderedlist', service.orderedList)


module.exports = router;