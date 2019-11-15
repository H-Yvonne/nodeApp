const express = require('express');
const router = express.Router();
const token = require('../component/token.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  // res.render('index', { title: 'Express' });
});

router.post('/store', token.check, require('../controller/store'));

module.exports = router;
