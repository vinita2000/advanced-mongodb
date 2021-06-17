const mongoose = require('mongoose');

const schema = new mongoose.Schema({

}, {strict:false});

const Shows = mongoose.model('shows', schema);
module.exports = Shows;