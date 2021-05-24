const mongoose = require('mongoose');

exports.findOne = async (req, res) => {
  try{

    const filter = req.body['filter'];

    const data = await mongoose.connection.db.collection('flightData').findOne(filter);

    res.status(201).json({
      message: 'Success',
      data
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.findAll = async (req, res) => {
  try{

    const filter = req.body['filter'] || {};

    const data = await mongoose.connection.db.collection('flightData').find(filter).toArray();

    res.status(201).json({
      message: 'Success',
      data
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};
