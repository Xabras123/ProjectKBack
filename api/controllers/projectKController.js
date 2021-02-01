'use strict';

var cors = require('cors')
var mongoose = require('mongoose'),
Movie = mongoose.model('movies');

exports.getMovies = function(req, res) {

    Movie.find({}, function(err, movie) {

    if (err)
      res.send(err);
    res.json(movie);
  });
};




exports.createMovie = function(req, res) {

  Movie.find({title: new RegExp(req.body.title, 'i')}, function(err, movies) {

    
    if (err){ 
      res.send(err);
      return
    }
    
    for( var i = 0 ; i < movies.length ; i++){
      console.log(movies[i]._doc.title)
      if(movies[i]._doc.title.toLowerCase() == req.body.title.toLowerCase()){
        res.send("Movie with that title already exist!");
        return
      }
    } 
    var newMovie = new Movie(req.body);
    newMovie.rating = 5;
    newMovie.views = 0;
    newMovie.amountOfRatings = 1;
    newMovie.save(function(err, movie) {
      if (err){
        res.send(err);
      }
      res.json(movie);
    });
    
  });



};






exports.searchMovieByTitle = function(req, res) {

  if(req.body.title == null){

    res.send("Please serach by title")
    return 

  }

  if(req.body.title == ""){
    res.json([]);
    return
  }
  

    Movie.find({title: new RegExp(req.body.title, 'i')}, function(err, movies) {
      if (err)
        res.send(err);
      res.json(movies);
    });

};


exports.searchMovieByCategories = function(req, res) {

  if(req.body.categories == null){

    res.send("Please serach by categories")
    return

  }
  

  Movie.find({categories: {"$all": req.body.categories }}, function(err, movies) {
    if (err)
      res.send(err);
    res.json(movies);
  });

};

exports.rateMovie = function(req, res) {

  if(req.body.rating > 10 || req.body.rating < 0){

    res.send('{ "message": "Rating must be between 0 and 10"}');
    return

  }


  Movie.findOne({_id: req.body.movieId}, function(err, foundMovie) {
      if (err){
        
        res.send('{ "message": "Movie With id: ' + req.body.movieId + ' not found"}');
      }
      
      return Movie.updateOne({_id: req.body.movieId},  {
                                                  rating : calculateRating(foundMovie._doc.amountOfRatings, foundMovie._doc.rating, req.body.rating), 
                                                  amountOfRatings: foundMovie._doc.amountOfRatings + 1 
                                                }
      , function(err, movie) {
        if (err){
          console.log(err)
          res.send('Error ocurred updating the rating ' );
        }
        res.json("{rating:" + calculateRating(foundMovie._doc.amountOfRatings, foundMovie._doc.rating, req.body.rating) +  "}");
      });
  });
};


exports.addView = function(req, res) {


  Movie.findOne({_id: req.body.movieId}, function(err, movie) {
    if (err){
      
      res.send('{ "message": "Movie With id: ' + req.body.movieId + ' not found"}');
    }

    return Movie.updateOne({_id: req.body.movieId}, {views : movie._doc.views + 1}, function(err, movieToUpdate) {
      if (err){
        
        res.send("Error ocurred in the server during the update");
      }
      res.json(movieToUpdate);
    });
  });
  
};



exports.getNovelties = function(req, res) {


  if(req.params.daysToConsiderNovelty == null || req.params.daysToConsiderNovelty < 0){

    res.send('please add valid days to parameter daysToConsiderNovelty');
    return

  }

  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() - req.params.daysToConsiderNovelty);


  var query = {
    "releaseDate": {
        $gte: pastDate,
        $lte: today
    }
  };

  Movie.find(query, function(err, movies) {

    if (err){
      
      res.send('error ocurred getting the novelties' + err);
    }

    res.json(movies)

  });
  
};


function calculateRating(amountOfRatings, movieRating, rating){

  return ((movieRating * amountOfRatings) + rating) / (amountOfRatings + 1)
}





//exports.read_a_task = function(req, res) {
//  Task.findById(req.params.taskId, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};


//exports.update_a_task = function(req, res) {
//  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json(task);
//  });
//};
//
//
//exports.delete_a_task = function(req, res) {
//
//
//  Task.remove({
//    _id: req.params.taskId
//  }, function(err, task) {
//    if (err)
//      res.send(err);
//    res.json({ message: 'Task successfully deleted' });
//  });
//};
