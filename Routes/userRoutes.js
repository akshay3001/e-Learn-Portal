var express = require( 'express' );
var jwt    = require('jsonwebtoken');

var routes = function( User ) {

  var userRouter = express.Router();
  var userController = require( '../Controllers/userController' )( User );

  userRouter.route( '/' )
  .post( userController.post);

  userRouter.use(function(req, res, next) {
  
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "MYSECRETKEY007", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;  
        console.log("hi");  
        next();
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


  userRouter.use('/:userId', function(req, res, next){
    User.findById(req.params.userId, function(err, user){
      if(err){
        res.status(500).send('no user found');
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('no user found');
      }
    });
  });

  userRouter.route( '/' )
  .get( userController.get );
  userRouter.route('/').put( function( req, res ) {
    console.log(req.decoded.userid);


      User.findById(req.decoded.userid, function(err, user){
      if(err){
        res.status(500).send('no user found');
      } else if (user) {
              req.user = user;
              if ( req.body._id ) {
                delete req.body._id;
              }

              for ( var p in req.body ) {
                req.user[p] = req.body[p];
              }
            
              //req.user.firstName = req.body.firstName;

              req.user.save( function( err ) {
                if ( err ) {
                  res.status( 500 ).send( err );
                }
                
                else {
                  res.status( 200 ).send( req.user );
                }
                
              });





      } else {
        res.status(404).send('no user found');
      }
    });
  })
  .delete( function( req, res ) {
    //var ObjectId = require('mongodb').ObjectID;
    //console.log(req.body.id)
     User.findOne({_id : "58e148fcfb28041c8c211393"}, function(err, user){
      console.log(user);
      if(err){
        res.status(500).send('no user found');
      } else if (user) {
        res.status( 200 )
      } else {
        res.status(404).send('no user found');
      }
    });
  });

  return userRouter;

};

module.exports = routes;
