const mongoose = require('mongoose');

exports.updateOne = async (req, res) => {
  try{

    const { filter, query }  = req.body;

    await mongoose.connection.db.collection('flightData').updateOne(filter, {$set: query});

    res.status(201).json({
      message: 'Success'
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.updateMany = async (req, res) => {
  try{

    let filter;
    const { query }  = req.body;

    if (req.body['filter']){
      filter = req.body['filter'];
    };

    filter = {
      'distance': {'$gte': 1000}
    };   

    await mongoose.connection.db.collection('flightData').updateMany(filter, {$set:query});

    res.status(201).json({
      message: 'Success'
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};
