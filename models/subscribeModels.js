var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

 
 var subscribeSchema = new mongoose.Schema({
 	email : {type: String, required : true, unique : true}
 });

var subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = subscribe;