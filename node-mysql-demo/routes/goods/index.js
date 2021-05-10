let express = require('express');
let router = express.Router();
let service = require('./service');

router.get('/admin/goodslist', service.goodsList);
router.post('/admin/goodslist/addgoods', service.addGoods);
router.post('/admin/goodslist/updategoods', service.updateGoods);
router.post('/admin/goodslist/deletegoods', service.deleteGoods)
router.get('/admin/orderedlist', service.orderedList)
router.post('/admin/orderedlist/changestate', service.changeOrderState)
module.exports = router;