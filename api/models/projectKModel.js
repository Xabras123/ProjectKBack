'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MovieSchema = new Schema({

  img: {
    type: String,
    required: 'Please enter a movie image link'
  },

  title: {
    type: String,
    required: 'Please enter the movie title'
  },

  synopsis: {
    type: String,
    required: 'Please enter the movie synopsis'
  },

  duration: {
    type: Number,
    required: 'Please enter the movie duration'
  },
  categories: {
    type: [{
      type: String
    }],
    required: 'Please select atleast one category for the movie'
  },

  trailerLink: {
    type: String,
    required: 'Please enter the movie trailer link'
  },

  releaseDate: {
    type: Date,
    required: 'Please enter the movie release date'
  },

  views: {
    type: Number,
    default: 0
  },

  movieLikes: {
    type: Number,
    default: 0
  },

  amountOfRatings: {
    type: Number,
    default: 0
  },

  movieLikePercentage: {
    type: Number,
    default: 0
  },

});

module.exports = mongoose.model('movies', MovieSchema);
