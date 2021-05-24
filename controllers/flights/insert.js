const mongoose = require('mongoose');

exports.insertOne = async (req, res) => {
  try{

    const query = {
      "departureAirport": req.body["departureAirport"],
      "arrivalAirport": req.body["arrivalAirport"],
      "aircraft": req.body["aircraft"],
      "distance": req.body["distance"],
      "intercontinental": req.body["intercontinental"]
    };

    await mongoose.connection.db.collection('flightData').insertOne(query);

    res.status(201).json({
      message: 'Success'
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.insertMany = async (req, res) => {
  try{

    let query = [];

    for(let obj of req.body['data']){
      query.push({
          "departureAirport": obj["departureAirport"],
          "arrivalAirport": obj["arrivalAirport"],
          "aircraft": obj["aircraft"],
          "distance": obj["distance"],
          "intercontinental": obj["intercontinental"]
      });
    }
    
    await mongoose.connection.db.collection('flightData').insertMany(query);

    res.status(201).json({
      message: 'Success'
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};