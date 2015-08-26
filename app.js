var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/cities', function (req, res) {
  var cities = ['Lotopia', 'Caspiana', 'Indigo'];
  res.json(cities);
});

/*
app.listen(3000, function () {
  console.log('Listening on 3000...');
});

We want our app and code that binds app to the network to be in a different file.
 */
 
module.exports = app;