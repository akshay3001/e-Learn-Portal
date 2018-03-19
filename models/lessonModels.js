var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;


var lessonModel = new Schema({
  lessonNo: {type:String},
  courseid : {type:String},
  title : { type : String},
  coursepath:{type:String},
  duration: {type:String},
  created : { type : Date, default : Date.now }
});

var Lesson = mongoose.model( 'Lesson', lessonModel );

module.exports = Lesson;
