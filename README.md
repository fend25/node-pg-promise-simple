# node-pg-promise-simple
PosgtreSQL (pg) promisified library for modern node and io.js (with built-in promises).

Connection: 
```js
var pg = require('pg-promise-simple');
var connString = "postgres://user:password@localhost:5432/dbname";

pg.connect(connString).then(function (connection) {
  global.db = connection.client; //for example
}).catch(function (e) {
  console.error('could not connect to postgres', e);
  return;
});
```

Usage:
```js
var query1 = 'SELECT id, text1 FROM some_table WHERE id = $1 ';
var query2 = 'INSERT INTO texts (text1) VALUES ( $1 ) RETURNING id, text1';

db.query(query1, [someIntForPassedId]).then(function (result) {
  var text1 = result.rows[0].text1;
  return db.query(query2, [text1]);
}).then(fucntion(result2) {
  var res = result2.rows[0];
  console.log('id for ' + res.text1 + ' is ' + res.id);
}).catch(function (err) {
  console.log(err);
});
```

License: ISC