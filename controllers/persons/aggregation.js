
const Persons = require('../../models/persons');

exports.livingInCity =  async (req, res) => {
  try{

    let filter = {};

    if (req.query['gender']) filter['gender'] = req.query['gender'];

    const data = await Persons.aggregate([
      {
        $match: filter
      },
      {
        $group: { 
          _id: { state: '$location.state'},
          totalPersons: { $sum: 1 }
        }
      },
      {
        $sort: { totalPersons: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  }catch(e){
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
}

exports.projectGeoLocation =  async (req, res) => {
  try{

    const data = await Persons.aggregate([
      {
        $project: {
          _id: 0,
          name: {
            $concat: [
              { 
                $toUpper: {
                  $substrCP: ['$name.first', 0, 1] 
                }
              },
              { 
                $substrCP: [
                  '$name.first',
                  1,
                  { $subtract: [{ $strLenCP:'$name.first' }, 1] }
                ]
              },
              ' ',
              { 
                $toUpper: { 
                  $substrCP: ['$name.last', 0, 1] 
                } 
              },
              { $substrCP: [
                '$name.last',
                1,
                { $subtract: [ {$strLenCP:'$name.last'}, 1] }
              ]},
            ]
          },
          age: '$dob.age',
          dob: { $dateFromString: { dateString: '$dob.date' } },
          email: 1,
          location: {
            type: 'Point',
            coordinates: [
              '$location.coordinates.longitude',
              '$location.coordinates.latitude'
            ]
          }
        }
      },
      {
        $sort: { age: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
}

exports.buckets =  async (req, res) => {
  try{

    const data1 = await Persons.aggregate([
      {
        $bucket: {
          groupBy: '$dob.age',
          boundaries: [18, 30, 50, 60, 70, 80],
          output: {
            numPersons: { $sum: 1 },
            averageAge: { $avg: '$dob.age' }
          }
        }
      }
    ]);

    const data2 = await Persons.aggregate([
      {
        $bucketAuto: {
          groupBy: '$dob.age',
         buckets: 5,
          output: {
            numPersons: { $sum: 1 },
            averageAge: { $avg: '$dob.age' }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      bucket1: data1,
      bucket2: data2
    });

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
}

exports.personToFriends = async (req, res) => {
  try{
    let data = {};
    let skp = 0; let lmt = 2;

    if (req.query['skip']) skp = parseInt(req.query['skip']);
    if (req.query['limit']) lmt = parseInt(req.query['limit']);
   
    data = await Persons.aggregate([
      {
        $project: {
          name: { $concat: ["$name.first", " ", "$name.last"] },
          age: "$dob.age"
        }
      },
      {
        $sort: { age: 1 }
      },
      {
        $skip: skp
      },
      {
        $limit: lmt
      },
      {
        $out: 'friends'
      }
    ]);

    res.status(200).json({
      success: true,
      data
    });

  }catch(e){
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};