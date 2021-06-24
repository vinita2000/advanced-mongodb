var express = require('express');
var router = express.Router();
const {
  olderThan
} = require('../controllers/persons/indexes');

router.get('/olderThan', olderThan);

module.exports = router;
