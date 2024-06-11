var express = require('express');
var router = express.Router();
const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const register = require('../controllers/register');
const login = require('../controllers/login');
const changerole = require('../controllers/changerole');
const newitem = require('../controllers/newitem');
const items = require('../controllers/items');
const changeitem = require('../controllers/changeitem')
const allitems = require("../controllers/allitems")
const allusers = require("../controllers/allusers")
const delitem = require("../controllers/delitem")
const history = require("../controllers/producthistory")
const VerifyRegister = require('../middlewares/registerverify');
const jwtm = require("../middlewares/jwt");

router.get('/api', function(req, res, next) {
  res.send('response');
});

router.post('/api/register', VerifyRegister.checkDuplicate, register.register);
router.post('/api/login', login.login);
router.post('/api/newitem', [jwtm.isUserA], newitem.newitem);
router.post('/api/changerole', [jwtm.isAdminA] , changerole.role);
router.post('/api/items', [jwtm.isUserA], items.items);
router.post('/api/changeitem',[jwtm.isUserA], changeitem.changeitem);
router.post('/api/allitems',[jwtm.isUserA], allitems.allitems)
router.post('/api/allusers', [jwtm.isAdminA], allusers.allusers)
router.post('/api/deleteitem', [jwtm.isUserA], delitem.delete)
router.post('/api/history', [jwtm.isUserA], history.history)
module.exports = router;