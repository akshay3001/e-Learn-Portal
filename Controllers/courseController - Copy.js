var jwt = require('jsonwebtoken');
var courseController = function( Course ) {

  'use strict';

  var post = function( req, res ) {
  
    var course = new Course( req.body );
    if ( !req.body.title ) {
      res.status( 400 );
      res.send( 'Title is required' );
    } else {
      course.save();
      res.status( 200 );
      res.send( course );
    }
  };

  var get = function(req, res) {
    Course.find({}, function(err, course) { 
      var obj = {};
      for(var i = 0; i < course.length; i++){
        var abc = course[i]._id;

        if(JSON.stringify(req.query.courseid) == JSON.stringify(abc)) {
          //console.log("hi");
          obj = course[i];
        }
      }
      return res.status(200).send({ 
        success: true,
        course:obj
      });
    });
  };


  var getAll = function(req, res) {
    Course.find({ 
        $text: {$search: req.body.keyword } 
       }, function(err, course) {
      //console.log("course"+course);
      //res.json(course);

      return res.status(200).send({ 
        success: true,
        course:course
      });
    });
  };

  return {
    post : post,
    get  : get,
    getAll : getAll
  };

};

module.exports = courseController;
