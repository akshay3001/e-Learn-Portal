var express = require( 'express' );
var jwt = require('jsonwebtoken');

var routes = function( Course ) {

var courseRouter = express.Router();
var courseController = require( '../Controllers/courseController' )( Course );

/*courseRouter.route( '/:courseId' )
    .get( function( req, res ) {
      var returnCourse = req.course.toJSON();
      var newLink = 'http://' + req.headers.host + '/api/courses/?genre=' + returnCourse.genre;

      returnCourse.links = {};
      returnCourse.links.filterByThisGenre = newLink.replace( ' ', '%20' );
      res.json( returnCourse ); 

});
*/

courseRouter.route( '/' ).get( courseController.get );
courseRouter.route('/getAll').post(courseController.getAll)
courseRouter.use( '/:courseId', function( req, res, next ) {
      //var ObjectId = require('mongodb').ObjectID(req.params.courseId);
      Course.findOne({_id:req.params.courseId}, function( err, course ) {
      console.log(JSON.stringify(course));
      if ( course ) {   
        
        return res.status(200).send({ 
          success: true, 
          course: course 
        });
      } else {
        return res.status(404).send({ 
          success: false, 
          message: 'no course found' 
        });
      
      }
    
    });
  
  });



courseRouter.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "MYSECRETKEY007", function(err, decoded) {      
      if (err) {
        return res.status(403).send({ 
          success: false, 
          message: "Failed to authenticate token." 
        });

      } else {
        // if everything is good, save to request for use in other routes
    
        if(decoded.admin == "Instructor") {    
          req.body.creatorid = decoded.userid;
          next();
        }
        else {   
          return res.status(403).send({ 
            success: false, 
            message: "You don't have access." 
          });
        }
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
    
  }
});




courseRouter.route( '/' )
    .post( courseController.post )


courseRouter.route( '/:courseId' ).put( function( req, res ) {
    
     
      req.course.title = req.body.title;
      req.course.instructor = req.body.instructor;
      req.course.genre = req.body.genre;
      req.course.duration = req.body.duration;

      req.course.save( function( err ) {
      
        if ( err ) {
        
          res.status( 500 ).send( err );
        
        } else {
        
          res.json( req.course );

        }
      
      });
        
    })
    .patch( function( req, res ) {
    
      if ( req.body._id ) {
      
        delete req.course._id;

      }

      for ( var p in req.body ) {
      
        req.course[ p ] = req.body[ p ];
      
      }
      
      req.course.save( function( err ) {
      
        if ( err ) {
        
          res.status( 500 ).send( err );
        
        } else {
        
          res.status( 200 ).send( req.course );
        
        }
      
      }); 
    })
    .delete( function( req, res ) {
    
      req.course.remove( function( err ) {
      
        if ( err ) {

          res.status( 500 ).send( err );
        
        } else {
        
          res.status( 204 ).send( 'Removed' );

        }
      
      });
    
    });

  return courseRouter;

};

module.exports = routes;
