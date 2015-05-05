'use strict';

var assert = require('assert');

var pg = require('./index.js');
var connString = "postgres://postgres@localhost:5432/";


var log = console.log;

pg.connect(connString).then(function (connection) {
   assert.notEqual(connection, null);
   testSelect(connection.client);
}).catch(function (e) {
  console.error('could not connect to postgres', e);
  return;
});

function testSelect(db) {
  var query1 = 'SELECT $1::int as i';
  var query2 = 'SELECT1';
  
  db.query(query1, [1]).then(function (result) {
    var i = result.rows[0].i;
    assert.equal(i, 1);
    console.log('OK:\tfisrt query passed, as planned');
    return db.query(query2);
  }).then(function(result2) {
    console.error('FAIL:\tthis line has not to be executed\n');
    finish();
  }).catch(function (err) {
    assert.equal(err.code, '42601');
    console.log('OK:\tsecond query failed and handled, as planned');
    console.log('\nboth test passed. exiting');
    finish();
  });
}

function finish() {
  process.exit();
}