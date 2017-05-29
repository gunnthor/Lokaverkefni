var database = function() {
  const pg = require('pg');
  const url = require('url');
  var fs = require('fs');

  console.log('entered database');
  
  const env_db_loc = process.env.DATABASE_URL;
  const db_loc = 'onelastride' || process.env.DATABASE_URL;

////HEROKU PostgreSQL///////////////////////////
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    const config = {
      //Connection to Heroku PostgreSQL
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true
    };
//////////////////////////////////////////////////
////LOCAL PostgreSQL/////////////////////////////
  // var config = {
  //   user: 'postgres', //env var: PGUSER 
  //   database: db_loc, //env var: PGDATABASE 
  //   password: 'root', //env var: PGPASSWORD 
  //   port: 5433, //env var: PGPORT  							MUNA BREYTA!
  //   max: 20, // max number of clients in the pool 
  //   idleTimeoutMillis: 300000000, // how long a client is allowed to remain idle before being closed 
  // };
/////////////////////////////////////////////////


  //this initializes a connection pool
  //it will keep idle connections open for 30 seconds
  //and set a limit of maximum 10 idle clients
  var pool = new pg.Pool(config);

  pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
  })

  const POOL_ERROR = {message: 'error fetching client from pool', code: 500};

  this.getIdCount = function(callback) {
    pool.connect(function(err,client,done){
      if(err) return console.error('error fetching client from pool', err);
      var query = client.query('SELECT COUNT (DISTINCT id) FROM maps;');

      query.on('row', function(row, result){
        // console.log('row í row:');
        // console.log(row);

        callback(row);
      });
      done();
    });
  }
  
  this.insertData = function(jsonData){
    var information = JSON.parse(jsonData.info);
    pool.connect(function(err, client, done) {
      if (err) {
        //throw POOL_ERROR;
        return console.error('error fetching client from pool', err);
      }

      var statement = 'INSERT INTO maps(data) VALUES($1)';
      var trackData = [];

      //client.query(statement,data);

      var insertionQuery = client.query(statement, [information]);
      insertionQuery.on('end', function(result) {
        console.log(result);               
      });
      done();
    });
  }

  this.selectQuery = function(mapNumber, callback) {
    console.log("database hér, hvaða map number er þetta?");
    console.log(mapNumber.data);
    var getMapNR = mapNumber.data;
    pool.connect(function(err,client,done){
      if(err) return console.error('error fetching client from pool', err);

      var checkQuery = client.query('SELECT data FROM maps where id =' + getMapNR);

      checkQuery.on('row', function(row, result){
        console.log('row í row:');
        // console.log(row.data);

        callback(row.data);

        // console.log('result í row:');
        // console.log(result);

      });

      checkQuery.on('end', function(result) {
        // console.log("results from checkQuery");
        // console.log(result.fields);
      });
    });
  }

  this.deleteQuery = function() {
    console.log('gonna delete this track!')
    pool.connect(function(err,client,done){
      if(err) return console.error('error fetching client from pool', err);

      var deleteQuery = client.query('delete FROM maps where id = 1');

      deleteQuery.on('row', function(row, result){
        console.log('row í row:');
        // console.log(row.data);

        // callback(row.data);

        // console.log('result í row:');
        // console.log(result);

      });

      deleteQuery.on('end', function(result) {
        // console.log("results from checkQuery");
        // console.log(result.fields);
      });
    });
  }



  /**
  * Gets an array containing the ids of all the bars in the database
  * @param {callback} deliverData - handles the bars data
  */
  this.getTrackIds = function(deliverData) {
    pool.connect(function(err, client, done) {
      if (err) {
        //throw POOL_ERROR;
        return console.error('error fetching client from pool', err);
      }

      var query = client.query('SELECT id FROM track');
      var track_ids = [];
      console.log("query?");
      console.log(query);

      query.on('row', function(row, result) {
        track_ids.push(row._id);
      });

      query.on('end', function(result) {
        deliverData(track_ids);
      });


      done();
    });
  };
}
module.exports = database;



