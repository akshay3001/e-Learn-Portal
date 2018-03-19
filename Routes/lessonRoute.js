var express = require( 'express' );

var routes = function( Lesson ) {

  var lessonRouter = express.Router();
  var lessonController = require( '../Controllers/lessonController' )( Lesson );

  lessonRouter.route( '/' )
  .post( lessonController.post);


  lessonRouter.route( '/' )
  .get( lessonController.getbycourseID );


  return lessonRouter;

};

module.exports = routes;
