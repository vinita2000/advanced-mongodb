const mongoose = require('mongoose');

exports.insertOne = async (req, res) => {
  try{

    const query = {
      "name": req.body["name"],
      "age": req.body["age"]
    };
  
    await mongoose.connection.db.collection('passenger').insertOne(query);

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
        "name": obj["name"],
        "age": obj["age"]
      });
    }
    
    await mongoose.connection.db.collection('passenger').insertMany(query);

    res.status(201).json({
      message: 'Success'
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};