var express = require('express');
var router = express.Router();
const { 
  pagination,
  leastRated,
  mostRated,
  average,
  search,
  runningShows,
  countryWiseShows,
  genreWiseShows,
  update,
  rename,
  findAllMovies,
  findAllGenres,
  textIndex
} = require('../controllers/shows/all');

router.get('/all', pagination);
router.get('/leastRated', leastRated);
router.get('/mostRated', mostRated);
router.get('/average', average);
router.get('/search', search);
router.get('/runningShows', runningShows);
router.get('/countryWiseShows', countryWiseShows);
router.get('/genreWiseShows', genreWiseShows);
router.put('/update', update);
router.get('/rename', rename);
router.get('/findAllMovies', findAllMovies);
router.get('/findAllGenres', findAllGenres);
router.get('/textIndex', textIndex);

module.exports = router;
