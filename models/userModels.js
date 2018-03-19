// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userModel = new Schema({     
    firstName: {
        type:String,
        required: true,
    }, 
    lastName: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    address: String,
   	userName: { 
   		type: String, 
   		unique: true
   	},
    password: {
        type:String,
        required: true
    },
    admin: {
        type:String,
        required: true
    },
    active: {
        type:String
    },
    proImg: { type: String },
    created : { type : Date, default : Date.now } 

});


var User = mongoose.model( 'User', userModel );

module.exports = User;
