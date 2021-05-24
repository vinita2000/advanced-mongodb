var express = require('express');
var router = express.Router();
const { insertOne, insertMany } = require('../controllers/passengers/insert');
const { findAll, findOne } = require('../controllers/passengers/find');
const { updateOne, updateMany } = require('../controllers/passengers/update');

router.post('/insertOne', insertOne);
router.post('/insertMany', insertMany);

router.get('/findAll', findAll);
router.get('/findOne', findOne);

router.put('/updateOne', updateOne);
router.put('/updateMany', updateMany);

module.exports = router;
