 /*
 * Write your Express server in this file as described in README.md.
 */
var author_name = "Xiaomeng Li";
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var gameData = require('./gameData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',function (req,res) {
	console.log("TESTING Home Page");
	var templateArgs = {
		games: gameData,
		active_home: true
	}
	res.render('homePage', templateArgs);
});

app.get('/about',function (req,res) {
	console.log("TESTING About Page");
	var templateArgs = {
		active_about: true
	}
	res.render('aboutPage',templateArgs);
});

app.get('/games/:name',function (req,res,next) {
	console.log("TESTING POST Page");
	var idx = 0;
	var one_post;
	var name = req.params.name;
	while(gameData[idx]){
		console.log("idx = ",idx);
		console.log("link = ",gameData[idx].link);
		console.log("name = ",name);
		if(gameData[idx].link == name){
			one_post = gameData[idx];
			break;
		}
		idx++;
	}
	if(one_post){	
		var postData = one_post.posts;
		var templateArgs = {
			posts: postData
		}		
		res.render('postPage', templateArgs);
	}
	else{
		next();
	}
});

app.get('/games/:name/:index',function (req,res,next) {
	console.log("TESTING Content Page");
	var name = req.params.name;
	var idx = req.params.index;
	var counter = 0;
	while(gameData[counter]){
		console.log("idx = ",counter);
		console.log("link = ",gameData[counter].link);
		console.log("name = ",name);
		if(gameData[counter].link == name){
			one_post = gameData[counter];
			break;
		}
		counter++;
	}
	if(one_post){	
		var contentData = one_post.posts[idx].contents;
		if(contentData){
			var templateArgs = {
				contents: contentData
			}
			res.render('contentPage', templateArgs);
		}
		else	next();
	}
	else	next();
});

/*app.get('/', function (req, res) {
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
});*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('*', function (req, res) {
  console.log("404 Not Found!");
  res.render('404Page');
  res.status(404);
});



app.listen(port, function() {
	console.log("Created by ", author_name);
	console.log("SERVER listening on port", port);
});