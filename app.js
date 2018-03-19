express = require( 'express' );
var mongoose = require( 'mongoose' );
var bodyParser = require( 'body-parser' );
var path = require('path');
var config = require('./config');

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var db;


if ( process.env.ENV === 'Test' ) {
   mongoose.Promise = global.Promise;
  var db = mongoose.connect( config.database );
} else {
  var db = mongoose.connect( config.database );

}

var User = require( './models/userModels' );
var Course = require( './models/courseModels' );
var Lesson = require( './models/lessonModels' );
var subscribeModels = require( './models/subscribeModels' );
var Subscribe = require( './models/subscribeModels' );
//var Image = require('./models/ImageModel');

app  = express();
//app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
server = require('http').createServer(app)
io = require('socket.io').listen(server)

app.use(express.static('public'))
var port = config.PORT;

var config = require('./chatapp');

app.use( bodyParser.urlencoded({ extended : true }));
app.use( bodyParser.json());


authenticatRouter = require( './Routes/authentication' )( User )
userRouter = require( './Routes/userRoutes' )( User );
courseRouter = require( './Routes/courseRoutes' )( Course );
allcourseRouter = require( './Routes/allcourseRoutes' )( Course );
alluserRouter = require( './Routes/allusersRoute' )( User );
lessonRouter = require( './Routes/lessonRoute' )( Lesson );
//imageRouter = require( './Routes/imageRoute' )( Image );
subscribeRouter = require('./Routes/subscribeRoutes')(Subscribe);
singlecourseRouter = require('./Routes/singlecourseRouter')(Course);

app.use( '/api/allusers', alluserRouter );
app.use( '/api/allcourse', allcourseRouter );
app.use( '/api/authenticat', authenticatRouter);
app.use( '/api/user', userRouter);
app.use( '/api/course', courseRouter);
app.use('/api/getsinglecourse', singlecourseRouter)
app.use( '/api/lesson', lessonRouter);
app.use('/api/subscribe', subscribeRouter);


var routes = require('./Routes/imagefile');
app.use('/testImage', routes);
app.use(express.static('public'));

//app.use( '/api/image', imageRouter);


app.post("/contact", function(req, res){

var api_key = 'key-93f1d3a63817c1379200fe33c95165d6';
var domain = 'sandbox0f7199227c3c441b8064292ffa8cd1ab.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'akshay<postmaster@sandbox0f7199227c3c441b8064292ffa8cd1ab.mailgun.org>',
  to: 'akshaymhatre89@yahoo.in',
  subject: req.body.email,
  text: req.body.message
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
  if(!error)
  res.send({"success":true});
else
res.send({"success":false});
});

})
/*
app.get( '/', function( req, res ) {
  res.send( 'welcome to my API' );
});
*/
/*app.listen( port, function() {
  console.log( 'Running at port:', port );
});
*/

//process.env.PORT || 5000

//var port = process.env.PORT || 8000
//var port = 3001;
server.listen(port, function() {
    console.log("App is running on port " + port);
});

module.exports = app;



