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
    .put(projectK.rateMovie)

  app.route('/get-single-movie')
    .post(projectK.getSingleMovie)



};

