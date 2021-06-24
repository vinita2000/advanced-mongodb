const mongoose = require('mongoose');

const schema = new mongoose.Schema({

});

const Persons = mongoose.model('persons', schema);
module.exports = Persons;