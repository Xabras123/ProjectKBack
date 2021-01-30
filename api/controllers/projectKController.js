'use strict';

var cors = require('cors')
var mongoose = require('mongoose'),
Movie = mongoose.model('movies');

exports.getMovies = function(req, res) {
  console.log("me hicieron requestttttt");

    Movie.find({}, function(err, movie) {

    if (err)
      res.send(err);
    res.json(movie);
  });
};




exports.createMovie = function(req, res) {
  var newMovie = new Movie(req.body);
  newMovie.save(function(err, movie) {
    if (err){
      res.send(err);
    }
    res.json(movie);
  });
};


exports.rateMovie = function(req, res) {

  if(req.body.newRating > 10 || req.body.newRating < 0){

    res.send('{ "message": "Rating must be between 0 and 10"}');
    return

  }
  Movie.updateOne({_id: req.body.movieId}, {rating : req.body.newRating}, function(err, movie) {
    if (err){
      
      res.send('{ "message": "Movie With id: ' + req.body.movieId + ' not found"}');
    }
    res.json(movie);
  });
};


exports.getSingleMovie = function(req, res) {

  var isTitleNull = false;
  var areCategoriesEmpty = false;


  if(req.body.title == null){

    isTitleNull = true;

  }
  
  if(req.body.categories == null){
    areCategoriesEmpty = true

  }

  if(isTitleNull && areCategoriesEmpty){
    res.send("Please serach by title, categories or both")
    return
  }//else if(!isTitleNull && areCategoriesEmpty){

    Movie.findOne({title: req.body.title}, function(err, movie) {
      if (err)
        res.send(err);
      res.json(movie);
    });
  //}




};



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
