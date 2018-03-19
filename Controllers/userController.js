var jwt = require('jsonwebtoken');

var userController = function( User ) {

  'use strict';
  var respmessage;
  var post = function( req, res ) {
    console.log(req.body);
    var user = new User( req.body );
      user.save(function (err) {
          if(err) {          
            res.status( 301 );
            res.send( {"success": "err"} );
          }
          else {
            res.status( 200 );
            res.send( respmessage || {"success": true} );
          }
      });
      
  };

  var get = function(req, res) {
    if (req.query.token) {
        var authorization = req.query.token,
            decoded;    
        try {
            decoded = jwt.verify(authorization, "MYSECRETKEY007");
      console.log(decoded);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
        /*User.findOne({_id: userId}).then(function(user){
            // Do something with the user
      
      return res.status(200).send({
        userName: user.userName 
      });
        });*/
    console.log(decoded.userid)
    var obj = {};
    if (decoded.admin != "Admin" ) {
        obj = {_id: decoded.userid};
    }


    User.find(obj, function(err, users) {
      res.json(users);
    });
   }
  };

  var getAll = function(req, res) {
    console.log("hi");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      console.log(token);
        var authorization = token,
            decoded;    
        try {
            decoded = jwt.verify(authorization, "MYSECRETKEY007");
            console.log(decoded);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
        /*User.findOne({_id: userId}).then(function(user){
            // Do something with the user
      
      return res.status(200).send({
        userName: user.userName 
      });
        });*/
    
    var obj = {};

    if (decoded.admin != "Admin" ) {
        console.log("i am in");
        obj = {_id: decoded.userid};
    }


    User.find(obj, function(err, users) {
      res.json(users);
    });
   }
  };
 /*
  var get = function( req, res ) {
    var query = {};
    if ( req.query.userName ) {
      query.userName = req.query.userName;
      console.log(JSON.stringify(query))
    }

    User.find( query, function( err, user ) {
      if ( err ) {
        res.status( 500 ).send( err );

      } else {
        var returnUser = [];
        user
          .forEach( function( element, index, array ) {          
            var newUser = element.toJSON();
            returnUser.push( newUser );
          });
        res.json( user );
      }
    
    });
  
  };*/

  return {
    post : post,
    get  : get,
    getAll : getAll
  };

};

module.exports = userController;
