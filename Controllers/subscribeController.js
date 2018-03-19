var subscribeController = function( Subscribe ) {

  'use strict';

  var post = function( req, res ) {
    console.log(req.body.email);
    var subscribe = new Subscribe( req.body );
    if ( !req.body.email ) {
    
      res.status( 400 );
      res.send( 'Email is required' );
    
    } else {
    
      subscribe.save();
      res.status( 200 );
      res.send( subscribe );
    
    }

  };

  var get = function(req, res) {
    Subscribe.find({}, function(err, subscribe) {
      if(!err) {
        res.status( 200 );
        var abc = {"success": "false", "subscribe": subscribe};
        res.send( abc);
      }
      else
      {
        res.status( 300 );
        res.send( {"success": "false"} );
      }      
    });
    
  };

  return {
    post : post,
    get : get
  };
}

module.exports = subscribeController;