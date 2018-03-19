var express = require( 'express' );
var jwt    = require('jsonwebtoken');
//var config = require('././config');
var routes = function( User ) {

  var userRouter = express.Router();
  //var userController = require( '../Controllers/userController' )( User );

  userRouter.route( '/' ).post(function(req, res) {

  User.find({
    userName: req.body.userName
  }, function(err, user) {
    //console.log(user);
    if (err) throw err;
    
    if (user[0] == null) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user[0].userName) {

      // check if password matches
      if (user[0].password == req.body.password) {

        // if user is found and password is right
        // create a token
        /*var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });*/

      console.log("user[0]._id"+user[0]._id+"user[0].userName"+user[0].userName+"user[0].admin"+user[0].admin);
      var userid = user[0]._id;
      var tempUser = { userid:user[0]._id, userName: user[0].userName, admin: user[0].admin };
      var token = jwt.sign(tempUser, "MYSECRETKEY007", {
      expiresIn: 1440 // expires in 24 hours
      });
        // return the information including token as JSON
        res.status( 200 );
        res.send({
          success: true,
          token: userid,
          userRole: user[0].admin,
          userName:user[0].userName,
          userPhoto:user[0].proImg,
          token: token
        });
      } else {
        res.status( 301 );
        res.send({
          success: false,
        });

      }   

    }

  });
});

    return userRouter;

};

module.exports = routes;
