/*
 * Write your Express server in this file as described in README.md.
 */
var author_name = "Xiaomeng Li";
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var twitData = require('./twitData');
var app = express();
var port = process.env.PORT || 3000;

var display;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  console.log("Reuqesting Twit Page");
  display = true;
    var templateArgs = {
      twits: twitData,
      title: "Tweeter",
	  display: display
    }
	
    res.render('twitPage', templateArgs);
  
});

app.get('/twits/:index',function (req,res,next){
	display = false;
	console.log("Reuqesting url params: ", req.params);
	var idx = req.params.index;
	var oneTwit = twitData[idx-1];
	if(oneTwit){
		var templateArgs = {
			text: oneTwit.text,
			author: oneTwit.author,
			display: display,
			title: "Twit created by " + oneTwit.author
		}
		res.render('twitPage', templateArgs);
	} else {
		next();
	}
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  console.log("404 Not Found!");
  res.render('404Page');
  res.status(404);
});



app.listen(port, function() {
	console.log("Created by ", author_name);
	console.log("SERVER listening on port", port);
});