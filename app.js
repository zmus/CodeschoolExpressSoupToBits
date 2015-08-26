var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });  
// { extended: false } => use node's native string parsing library
// Middleware that creates request.body object

app.use(express.static('public'));

var redis = require('redis');
var client = redis.createClient();

// select production db OR development db if process.env.NODE_ENV === undefined
client.select(process.env.NODE_ENV || 'test'.length);

client.flushdb();

app.get('/cities', function (req, res) {
  client.hkeys('cities', function (error, names) {
    if (error) throw error;
    res.json(names);
  });
});

app.post('/cities', urlencode, function (req, res) {
  var newCity = req.body;
  client.hset('cities', newCity.name, newCity.description, function(error) {
    if (error) throw error;
    res.status(201).json(newCity.name);
  });
});

/*
app.listen(3000, function () {
  console.log('Listening on 3000...');
});

We want our app and code that binds app to the network to be in a different file.
 */

module.exports = app;

// Notice we don't export bodyParser, Redis..., only 'app' which uses them!
//  => other modules can use different or the same databases, ex. test.js  