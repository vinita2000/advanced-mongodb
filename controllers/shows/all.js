
const { ObjectId } = require('mongodb');
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

exports.runningShows = async (req, res) => {
  try{
    let data;
    let count = 0;

    const result = await Shows.aggregate([
      {
        $match: { 'status': { $exists:true, $ne:'Ended' } }
      },
      {
        $project: {
          _id: 0,
          url: 1,
          name: 1,
          runtime: 1,
          status: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "name": 1 } }
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

exports.countryWiseShows = async (req, res) => {
  try{
    let data;
    let count = 0;
    let country = '^';

    if (req.query['country']) country = `^${req.query['country']}`;

    const result = await Shows.aggregate([
      {
        $match: { 
          'network': { $exists: true },
          $or: [
            {'network.country.name': { $regex: country, $options:'im' }},
            {'network.country.code': { $regex: country, $options:'im' }}
          ]
         }
      },
      {
        $project: {
          _id: 0,
          url: 1,
          name: 1,
          runtime: 1,
          'network.country': 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "name": 1 } }
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

exports.genreWiseShows = async (req, res) => {
  try{
    let data;
    let count = 0;
    let genre = '^';

    if (req.query['genre']) genre = `^${req.query['genre']}`;

    const result = await Shows.aggregate([
      {
        $match: { 
          'genres': { $exists: true },
          'genres': { $regex: genre, $options:'im' }
         }
      },
      {
        $project: {
          _id: 0,
          url: 1,
          name: 1,
          runtime: 1,
          genres: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "name": 1 } }
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

exports.update = async (req, res) => {
  try{
    let data;
    let count = 0;
    let filter = {};
    let set = {};

    if (req.body['set'] && req.query['id']){
      set = req.body.set;
      filter['_id'] =  ObjectId(req.query.id);
    }

    await Shows.updateMany(
      filter,
      { $set: set }
    );
    
    const result = await Shows.aggregate([
      {
        $match: filter
      },
      {
        $project: {
          _id: 0,
          url: 1,
          name: 1,
          runtime: 1,
          genres: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "name": 1 } }
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

exports.rename = async (req, res) => {
  try{
    let data;
    let count = 0;

    await Shows.updateMany({}, {$rename: {'updated': 'updated_at'} });
    
    
    const result = await Shows.aggregate([
      {
        $project: {
          _id: 0,
          url: 1,
          name: 1,
          updated_at: 1
        }
      },
      {
        $facet: {
          'total_matched': [{ $group: { _id: null, count: { $sum: 1 } } }],
          'data': [
            { $skip: 0 },
            { $sort: { "name": 1 } },
            { $limit: 10 }
          ]
        } 
      }
    ]);

    data = result[0].data;
    if (data && data.length > 0) {
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

exports.findAllMovies = async (req, res) => {
  try{
    let data;
    let count = 0;
    
    const result = await Shows.aggregate([
      {
        $project: {
          _id: 0,
          name: 1
        }
      },
      {
        $facet: {
          'data': [
            {
              $group: {
                _id: null,
                movies: { $addToSet: "$name" },
              }
            }
          ]
        } 
      }
    ]);
  
    data = result[0].data;
    let movies = [];
    if (data && data[0] && data[0].movies && data[0].movies.length > 0) {
      count = data[0].movies.length;
      movies = data[0].movies.sort();
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: movies
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};

exports.findAllGenres = async (req, res) => {
  try{
    let data;
    let count = 0;
    
    const result = await Shows.aggregate([
      {
        $project: {
          _id: 0,
          genres: 1
        }
      },
      {
        $unwind: '$genres'
      },
      {
        $facet: {
          'data': [
            {
              $group: {
                _id: null,
                genres: { $addToSet: "$genres" },
              }
            }
          ]
        } 
      }
    ]);
  
    data = result[0].data;
    let genres = [];
    if (data && data[0] && data[0].genres && data[0].genres.length > 0) {
      count = data[0].genres.length;
      genres = data[0].genres.sort();
    }

    res.status(200).json({
      message: 'Success',
      total_matched: count,
      data: genres
    });

  }catch(e){
    res.status(500).json({
      message: e.message
    });
  }
};