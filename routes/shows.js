var express = require('express');
var router = express.Router();
const { 
  pagination,
  leastRated,
  mostRated,
  average,
  search
} = require('../controllers/shows/all');

router.get('/all', pagination);
router.get('/leastRated', leastRated);
router.get('/mostRated', mostRated);
router.get('/average', average);
router.get('/search', search);

module.exports = router;
