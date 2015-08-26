// npm i ejs --save  =>  we don't have to require it

var express = require('express');
var app = express();

app.use(express.static('public'));

var cities = require('./routes/cities');
app.use('/cities', cities);

/*
app.listen(3000, function () {
  console.log('Listening on 3000...');
});

We want our app and code that binds app to the network to be in a different file.
 */

module.exports = app;

// Notice we don't export bodyParser, Redis..., only 'app' which uses them!
//  => other modules like test.js can use different or the same database 