const mongoose = require('mongoose');

const schema = new mongoose.Schema({

});

const Friends = mongoose.model('friends', schema);
module.exports = Friends;