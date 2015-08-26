var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });  
// { extended: false } => use node's native string parsing library

app.use(express.static('public'));

var cities = {
  'Krizevci': 'moj su grad',
  'Zagreb': 'europska metropola', 
  'Hvar': 'lapan tamo zivi'
}

app.get('/cities', function (req, res) {
  res.json(Object.keys(cities));
});

app.post('/cities', urlencoded, function (req, res) {
  var newCity = req.body;
  cities[newCity.name] = newCity.description;
  res.status(201).json(newCity.name);
})

/*
app.listen(3000, function () {
  console.log('Listening on 3000...');
});

We want our app and code that binds app to the network to be in a different file.
 */
 
module.exports = app;