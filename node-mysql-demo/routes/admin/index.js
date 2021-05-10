let express = require('express');
let router = express.Router();
let service = require('./service')


router.post('/login', service.login);
router.get('/admin/adminlist', service.adminList);
router.post('/admin/adminlist/addadmin', service.addAdmin);
router.post('/admin/adminlist/updateadmin', service.updateAdmin)
router.get('/admin/adminlist/adminlistbycondition', service.adminListByCondition)
router.post('/admin/adminlist/deleteadmin', service.deleteAdmin);

module.exports = router;