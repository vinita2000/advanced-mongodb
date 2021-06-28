const Friends = require('../../models/friends');

exports.groupByAge =  async (req, res) => {
  try{

   const data = await Friends.aggregate([
     {
       $unwind: '$hobbies'
     },
     {
       $group: {
        _id: { age: '$age' },
        allHobbies: { $addToSet: '$hobbies' }
       }
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
};

exports.exams =  async (req, res) => {
  try{

   const data = await Friends.aggregate([
     {
       $project: {
         _id: 0,
        // examScore: { $slice: ['$examScores', 1] },
        numScores: { $size: '$examScores' },
        examScores: {
          $filter: {
            input: '$examScores',
            as: 'sc',
            cond: {
              $gt: [ '$$sc.score', 60 ]
            }
          }
        }
       }
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

exports.highestScores =  async (req, res) => {
  try{

   const data = await Friends.aggregate([
    {
      $unwind: '$examScores'
    },
    {
      $project: {
        _id: 1,
        name: 1,
        score: '$examScores.score'
      }
    },
    {
      $sort: { 'examScores.score': -1 }
    },
    {
     $group: {
       _id: '$_id',
       name: { $first: '$name' },
       totalScore: { $sum: '$score' },
       highestScore: { $max: '$score' }
     } 
    },
    {
      $sort: { totalScore: -1 }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        totalScore: 1,
        highestScore: 1
      }
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