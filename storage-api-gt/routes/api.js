var express = require('express');
var router = express.Router();
const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const reg = require('../controllers/register');
const log = require('../controllers/login');
const chr = require('../controllers/changerole');
const nwi = require('../controllers/newitem');
const itms = require('../controllers/items');
const VerifyRegister = require('../middlewares/registerverify');
const jwtm = require("../middlewares/jwt");


router.get('/api', function(req, res, next) {
  res.send('response');
});

router.get('/api/test', async function(req, res, next) {
  const test = await models.Position.create({positionname: 'admin'});
  res.status(200).json({'Role ID': test.positionid});
});

router.post('/api/register', VerifyRegister.checkDuplicate, reg.register);
router.post('/api/login', log.login);
router.post('/api/newitem', [jwtm.isUserA], nwi.newitem);
router.post('/api/changerole', [jwtm.isAdminA] ,chr.role);
router.post('/api/items', [jwtm.isUserA], itms.items);

module.exports = router;