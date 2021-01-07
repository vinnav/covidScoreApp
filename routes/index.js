var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/teaching.html', function(req, res, next) {
  res.render('teaching', { title: 'Express' });
});

router.get('/listData', function(req, res) {
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

module.exports = router;
