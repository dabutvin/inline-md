var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;

/* GET home page. */
router.get('/', function(req, res) {
    console.log( markdown.toHTML( "Hello *World*!" ) )
  res.render('index', { title: 'Inline MD', cache: false });
});

module.exports = router;
