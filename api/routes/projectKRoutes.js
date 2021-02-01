'use strict';
module.exports = function(app) {
  var projectK = require('../controllers/projectKController');


  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,DELETE, PUT, POST, UPDATE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    next();
  });
  // projectK Routes
  app.route('/get-movies')
    .get(projectK.getMovies);

  app.route('/create-movie')
    .post(projectK.createMovie)

  app.route('/rate-movie')
    .post(projectK.rateMovie)
  
  app.route('/add-view')
    .post(projectK.addView)

  app.route('/search-movie-by-title')
    .post(projectK.searchMovieByTitle)
  
  app.route('/search-movie-by-categories')
    .post(projectK.searchMovieByCategories)
  
  app.route('/get-novelties/:daysToConsiderNovelty')
    .get(projectK.getNovelties)



};

