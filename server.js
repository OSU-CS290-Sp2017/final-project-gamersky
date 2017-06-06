/*
 * Write your Express server in this file as described in README.md.
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/twits', function (req, res, next) {
  console.log("get twit");
	
  
  
    var templateArgs = {
      text: twitData.text,
      author: twitData.author,
      title: "Tweeter"
	  
    }
	
    res.render('twitData', templateArgs);
  
});

app.get('*', function (req, res) {
  //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});