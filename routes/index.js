var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Inline MD', cache: false });
});

router.get('/help', function(req, res) {
    res.render('help', { title: 'Help', cache: false });
});

router.get('/load', function(req, res) {
    res.render('load', { title: 'Load', cache: false });
});

module.exports = router;