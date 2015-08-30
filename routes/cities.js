var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });  
// { extended: false } => use node's native string parsing library
// Middleware that creates request.body object

/** --------------------------------------------------------------------------
 *                                 REDIS                        
--------------------------------------------------------------------------- */

var redis = require('redis');
var url = require('url');

// https://devcenter.heroku.com/articles/redistogo#using-with-node-js
if (process.env.REDISTOGO_URL) {
  var redisURL = url.parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(redisURL.port, redisURL.hostname);
  client.auth(redisURL.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  // select production db OR development db if process.env.NODE_ENV === undefined
  client.select((process.env.NODE_ENV || 'test').length);
}

/** **************************************************************************
 *                                 ROUTES                        
*************************************************************************** */

var router = express.Router();

router.route('/') 

  .get(function (req, res) {
    client.hkeys('cities', function (error, names) {
      if (error) throw error;
      res.json(names);
    });
  })

  .post(urlencode, function (req, res) {
    var newCity = req.body;
    if (!newCity.name || !newCity.description) {
      res.sendStatus(400);
      return false;  // prevents infinite loop
    }
    client.hset('cities', newCity.name, newCity.description, function(error) {
      if (error) throw error;
      res.status(201).json(newCity.name);
    });
  })

router.route('/:name') 

  .delete(function (req, res) {
    client.hdel('cities', req.params.name, function (err) {
      if (err) throw error;
      res.sendStatus(204);
    });
  })

  .get(function (req, res) {
    client.hget('cities', req.params.name, function (err, description) {
      res.render('show.ejs', 
        { city: { name: req.params.name, description: description } }
      );
    });
  });


module.exports = router;