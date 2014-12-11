var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
  country: String,
  cities: Array
});

module.exports = mongoose.model('City', citySchema);