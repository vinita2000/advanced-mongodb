var express = require('express');
var router = express.Router();
const { olderThan } = require('../controllers/persons/indexes');
const {
  livingInCity,
  projectGeoLocation,
  buckets
} = require('../controllers/persons/aggregation');

const { 
  groupByAge,
  exams,
  highestScores,
} = require('../controllers/persons/friends');


router.get('/olderThan', olderThan);
router.get('/livingInCity', livingInCity);
router.get('/projectGeoLocation', projectGeoLocation);
router.get('/buckets', buckets);

router.get('/groupByAge', groupByAge);
router.get('/exams', exams);
router.get('/highestScores', highestScores);

module.exports = router;
