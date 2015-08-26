/*  
  1.  npm i mocha --save-dev
  2.  npm i supertest --save-dev

  3.  "test": "mocha test.js -w" in package.json
        * works for -g and local packages!!!
          => npm automatically looks in "./node_modules/mocha/bin/mocha" 
        * -w = watch for file changes

  4.  npm test
*/

// library for testing node.js HTTP servers
var request = require('supertest');
var app = require('./app');

/******************************************************************************
 *                                 REDIS                         
 *****************************************************************************/

var redis = require('redis');
var client = redis.createClient();

// Select DB 4
client.select('test'.length); 

// Delete all the keys of the currently selected DB  
client.flushdb();

client.hset('cities', 'Krizevci', 'moj su grad');
client.hset('cities', 'Zagreb', 'europska metropola');
client.hset('cities', 'Hvar', 'lapanov grad');

/******************************************************************************
 *                                 TESTS                         
 *****************************************************************************/

describe('Requests to the root path', function () {

  it('Returns 200 status code', function (done) {

    request(app)
      .get('/')
      .expect(200)
      .end(function (error) {
        if (error) throw error;
        done();
       });
  }); 

  it('Returns a HTML format', function (done) {

    request(app)
      .get('/')
      .expect('Content-Type', /html/, done);
  }); 

  it('Returns an index file with Cities', function (done) {

    request(app)
      .get('/')
      .expect(/cities/i, done);
  }); 
});


describe('Listing cities on /cities', function () {

  it('Returns 200 status code', function (done) {

    request(app)
      .get('/cities')
      .expect(200, done);
  });

  it('Returns JSON format', function (done) {

      request(app)
        .get('/cities')
        .expect('Content-Type', /json/, done);  // RegEx
  });

  it('Returns initial cities', function (done) {

    request(app)
      .get('/cities')
      // expect('["Krizevci","Zagreb","Hvar"]', done);
      .expect(JSON.stringify(['Krizevci', 'Zagreb', 'Hvar']), done);  
  });
});


describe('Creating new cities', function () {

  it('Returns 201 status code', function (done) {

    request(app)
      .post('/cities')
      /**
       * We can send:
       *  - JS object (will be translated into JSON)
       *  - urlencoded data - ex. form submit
       */
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(201, done);
  });

  it('Return the city name', function (done) {

    request(app)
      .post('/cities')
      .send('name=Springfield&description=where+the+simpsons+live')
      .expect(/springfield/i, done);
  });

});


describe('Deleting cities', function () {

  it('Returns 204 status code (no content)', function (done) {  

    request(app)
      .delete('/cities/Springfield')
      .expect(204, done);
  });
});

  