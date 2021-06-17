
const Shows = require('../../models/shows');


exports.pagination = async (req, res) => {
  try{

    let data; let count=0;
    const query = {
      "runtime": { $lte: 30 }
    };
    let pageNo = 5;
    let lmt = 20;
    let skp = (pageNo - 1) * lmt;

    const result = await Shows.aggregate([
      {
        $match: query
      },
      {
        $project: {
          url: 1,
          name: 1,
          type: 1,
          language: 1,
          genre: 1,
          runtime: 1,
          rating: 1,
          weight: 1
        }
      },
      {
        $sort: { runtime: 1 }
      },
      {
        $facet: {
          'total_matched': [ { $group: { _id: null, count: { $sum: 1 } } }] ,
          'data': [
            { $skip: skp },
            { $limit: lmt }
          ] 
        }
      }
    ]);

    data = result[0].data;
    if (data.length > 0) {
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      total_fetched: data.length,
      data: data
    });

  }catch(e){
    console.log(e);
    res.status(500).json({
      message: e.message
    });
  }
};

exports.leastRated = async (req, res) => {
  try{
    let data; let count = 0;

    const result = await Shows.aggregate([
      {
        $match: { 
          $or: [{ "rating.average": { $lte: 5 } }]
        }
      },
      {
        $project: {
          url: 1,
          name: 1,
          type: 1,
          language: 1,
          genre: 1,
          runtime: 1,
          rating: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "rating.average": 1 } }
          ]
        } 
      }
    ]);

    data = result[0].data;
    if (data.length > 0) {
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: data
    });
  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.mostRated = async (req, res) => {
  try{
    let data; let count = 0;

    const result = await Shows.aggregate([
      {
        $match: { 
          $or: [{ "rating.average": { $gte: 9 } }]
        }
      },
      {
        $project: {
          url: 1,
          name: 1,
          type: 1,
          language: 1,
          genre: 1,
          runtime: 1,
          rating: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "rating.average": -1 } }
          ]
        } 
      }
    ]);

    data = result[0].data;
    if (data.length > 0) {
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: data
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.average = async (req, res) => {
  try{
    let data; let count=0;

    const result = await Shows.aggregate([
      {
        $match: { 
          $or: [
            { "rating.average": { $gte: 15 } },
            { "rating.average": { $lte: 19 } }
          ]
        }
      },
      {
        $project: {
          url: 1,
          name: 1,
          type: 1,
          language: 1,
          genre: 1,
          runtime: 1,
          rating: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "rating.average": 1 } }
          ]
        } 
      }
    ]);

    data = result[0].data;
    if (data.length > 0) {
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: data
    });


  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.search = async (req, res) => {
  try{
    let data;
    let count = 0;
    let search = '/';
    let toMatch = `${search}`;

    const result = await Shows.aggregate([
      {
        $match: { 
          $or: [
            { "name": { $regex: toMatch, $options:"i" }},
            { "genres": { $regex: toMatch, $options:"i" }}
          ]
        }
      },
      {
        $project: {
          url: 1,
          name: 1,
          type: 1,
          language: 1,
          genres: 1,
          runtime: 1,
          rating: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "rating.average": 1 } }
          ]
        } 
      }
    ]);

    data = result[0].data;
    if (data.length > 0) {
      count = result[0].total_matched[0]['count'];
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: data
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

