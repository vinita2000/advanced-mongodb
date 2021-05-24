const mongoose = require('mongoose');

const schema = new mongoose.Schema({

}, {strict:false});

const Flight = mongoose.model('flight', schema);

module.exports = Flight; 