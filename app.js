const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require("mysql");
const cors = require("cors");
const indexRouter = require('./routes/index');
require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json());

/*
// ======== DATABASE CONNECTION AND REQUESTS ========
// Comment this section out for development if there isn't a sql db running
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // All the info is in the .env file
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

    // ======== REQUESTS ========

app.get('/listData', function(req, res) {
  let sql = `SELECT * FROM ${process.env.DB_TABLE}`;
  connection.query(sql, function(err, data, fields) {
    if (err) throw err;
    console.log(data)
    res.json({
        status: 200,
        data,
        message: "User lists retrieved successfully"
    })
  })
});
*/
  // Add new data
  /* SQL query to initialize table:
CREATE TABLE covidScore(
id INT AUTO_INCREMENT PRIMARY KEY,
dateadded DATETIME,
nhsnumber VARCHAR(15),
fname VARCHAR(50),
lname VARCHAR(50),
sex VARCHAR(15),
dob DATETIME,
age INT,
resp INT,
spo INT,
stroke INT,
obesity INT,
everSmoker INT,
dementia INT,
leucophilia INT,
lymphopenia INT,
cxrChanges INT,
gcs INT,
comorbidRange INT,
tachypneoaRange INT,
ureaRange INT,
crpRange INT,
score INT
);

INSERT INTO covidScore (dateadded, nhsnumber, fname, lname)
VALUES (null, 4195315, "Paul", "Logan");
      */ 
    app.post('/newScore', function(req, res) {
    let sql = `INSERT INTO ${process.env.DB_TABLE}(dateadded, nhsnumber, fname, lfname,
    sex, dob, age, resp, spo, stroke, obesity, everSmoker, dementia,
    leucophilia, lymphopenia, cxrChanges, gcs, comorbidRange, tachypneoaRange,
    ureaRange, crpRange) VALUES (?)`;
    let values = [
      req.body.dateadded,
      req.body.nhsnumber,
      req.body.fname,
      req.body.lfname,
      req.body.sex,
      req.body.dob,
      req.body.age,
      req.body.resp,
      req.body.spo,
      req.body.stroke,
      req.body.obesity,
      req.body.everSmoker,
      req.body.dementia,
      req.body.leucophilia,
      req.body.lymphopenia,
      req.body.cxrChanges,
      req.body.gcs,
      req.body.comorbidRange,
      req.body.tachypneoaRange,
      req.body.ureaRange,
      req.body.crpRange,
    ];
    connection.query(sql, [values], function(err, data, fields) {
        if (err) throw err;
        res.json({
        status: 200,
        message: "New data added successfully"
      })
    })
});




// ======== VIEW ENGINE ========
//no view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());

//app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ======== ROUTES ========
app.use('/', indexRouter);

// ======== ERROR HANDLING ========
  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
  // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// curl -X POST http://localhost:3000/new -H "Content-Type: application/json" -d "{\"id\":\"4\", \"fname\":\"Bob\", \"gender\":\"male\"}"


module.exports = app;
