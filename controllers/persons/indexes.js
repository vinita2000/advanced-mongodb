
const Persons = require('../../models/persons');

exports.olderThan =  async (req, res) => {
  try{

    let data = {}; let count = 0;

    let filter = {};
    let index = {};

    if (req.query['age']){
      filter['dob.age'] = { $gt: parseInt(req.query['age']) };
      index['dob.age'] = 1;
    }
    if (req.query['gender']){
      filter['gender'] = req.query['gender'];
      index['gender'] = 1;
    }

    if (Object.keys(index).length > 0 ){
      await Persons.createIndexes({ 'dob.age': 1, 'gender': 1 }); // compound index
      console.log('created Index');
    } 
    
    const beforeTime = new Date();

    const result = await Persons.aggregate([
      {
        $match: filter
      },
      {
        $project: {
          _id: 0,
          name: { $concat: [ '$name.first', ' ', '$name.last' ] },
          age: '$dob.age',
          gender: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 }} }],
          'data': [{ $sort: { 'age': 1 } }]
        }
      }
    ]);

    const afterTime = new Date();

    const execTime = afterTime - beforeTime;

    data = result[0].data;
    if (data.length > 0) { 
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      success: true,
      total_matched: count,
      execution_time: execTime,
      data
    });

  }catch(e){
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};