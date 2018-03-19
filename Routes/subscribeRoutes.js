var express = require( 'express' );
var jwt    = require('jsonwebtoken');

var routes = function( Subscribe ) {

  var subscribeRouter = express.Router();
  var subscribeController = require( '../Controllers/subscribeController' )( Subscribe );

   subscribeRouter.route( '/' )
  .post( subscribeController.post);


  subscribeRouter.route( '/' )
  .get( subscribeController.get );


  return subscribeRouter;
};
module.exports = routes;



