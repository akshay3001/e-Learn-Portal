var jwt = require('jsonwebtoken');
var courseController = function( Course ) {

  'use strict';

  var post = function( req, res ) {
    console.log(req.body);
    var course = new Course( req.body );
    console.log(req.body.creatorid)
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
    console.log("hemant")
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {        
      var decoded;    
      try {
        decoded = jwt.verify(token, "MYSECRETKEY007");
        console.log(decoded);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      var userId = decoded.id;
      var obj;
      if (decoded.admin != "admin" ) {
        obj = {creatorid: decoded.userid};
      }

      Course.find(obj, function(err, course) {    
        return res.status(200).send({ 
          success: true,
          course:course,
          userName: decoded.userName
        });
      });
    }
    else
    {
      return res.status(401).send('unauthorized');
    }
  };


  var getAll = function(req, res) {
    console.log(JSON.stringify(req.body))
    if(req.body.keyword) {
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
    }
    else if(!req.body.keyword) {
      Course.find({}, function(err, course) {
        //console.log("course"+course);
        //res.json(course);

        return res.status(200).send({ 
          success: true,
          course:course
        });
      });
    }
  };

  var getcourseDetail = function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var authenticate = true;
    console.log("hi")
    jwt.verify(token, "MYSECRETKEY007", function(err, decoded) {      
      if (err) {
        console.log(err);
        authenticate = false;
      }

    
        console.log("I am in");
        //console.log("authenticate" +authenticate);
        Course.find({}, function(err, course) { 
          var obj = {};
          for(var i = 0; i < course.length; i++){
            var abc = course[i]._id;
            
            if(JSON.stringify(req.query.courseid) == JSON.stringify(abc)) {
              console.log(course[i].price);
              console.log(authenticate);
              if(course[i].price == "Premium" && authenticate)
              {
                  obj = course[i];
                  return res.status(200).send({ 
                  success: true,
                  course:obj
                });
              }
              else if(course[i].price == "Free")
              {
                  obj = course[i];
                  return res.status(200).send({ 
                  success: true,
                  course:obj
                });
              }
              else
              {
                return res.status(403).send({ 
                  success: false, 
                  message: "Failed to authenticate token." 
                });
              }
              
            }
          }
        });
    });
  };



  return {
    post : post,
    get  : get,
    getAll : getAll,
    getcourseDetail:getcourseDetail
  };

};

module.exports = courseController;
