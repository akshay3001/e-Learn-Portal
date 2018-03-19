var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var rateSchema = new Schema({
  client_id : { type:String}, 
  rate : {type:String}
}); 
var rate = mongoose.model('images', rateSchema);


var courseModel = new Schema({
  creatorid : {type:String},
  title : { type : String},
  description: { type: String },
  duration: {type:String},
  instructor : { type : String },
  genre : { type : String },
  price:{ type: String},
  subscribe : { type : String},
  created : { type : Date, default : Date.now }
});

var Course = mongoose.model( 'Course', courseModel );

module.exports = Course;
