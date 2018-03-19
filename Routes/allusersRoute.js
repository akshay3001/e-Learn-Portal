var express = require( 'express' );
var jwt    = require('jsonwebtoken');

var routes = function( User ) {

  var alluserRouter = express.Router();
  var userController = require( '../Controllers/userController' )( User );

alluserRouter.route( '/' ).get( userController.getAll );

  return alluserRouter;

};

module.exports = routes;
