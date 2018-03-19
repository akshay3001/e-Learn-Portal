var express = require( 'express' );
var jwt = require('jsonwebtoken');

var routes = function( Course ) {

var courseRouter = express.Router();
var courseController = require( '../Controllers/courseController' )( Course );

courseRouter.route( '/' ).get( courseController.getcourseDetail );

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


  return courseRouter;

};

module.exports = routes;
