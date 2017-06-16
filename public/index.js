
document.getElementById("create-contact-us").addEventListener("click",create_contact);
//document.getElementById("navbar-search-button").addEventListener("click",search);
//document.getElementById("navbar-search-input").addEventListener("change",search);
//document.getElementById("navbar-search-input").addEventListener("keyup",search);
document.getElementsByClassName("modal-close-button")[0].addEventListener("click",close_contact);

var all_post = document.getElementsByClassName("one-post");
var counter = 0;
while(all_post[counter]){
	if(counter%2==1){
		all_post[counter].style.backgroundColor = "#8c8c8c";
	}
	else{
		all_post[counter].style.backgroundColor = "#b3b3b3";
	}
	counter++;
}

function getGamename(){	
	var path = window.location.pathname.split('/');
	if (path[0] !== '' && pathComponents[1] !== 'people') {
		return null;
	}
	return path[2];
}

function getPos(){	
	var path = window.location.pathname.split('/');
	if (path[0] !== '' && pathComponents[1] !== 'people') {
		return null;
	}
	return path[3];
}

function insertNewPost(){
	var postLink = "#";
	var postTitle = document.getElementById("get-title").value;
	var postAuthor = document.getElementById("get-name").value;
	if (postTitle && postAuthor) {
		 var gameID = getGamename();
		 storePost(gameID, postTitle, postAuthor, function(err){

			if (err) {
			  alert("Unable to save post.  Got this error:\n\n" + err);
			} else {

				var postTemplate = Handlebars.templates.onePost;
				var templateArgs = {
					title: postTitle,
					author: postAuthor
				};
		var newpost = postTemplate(templateArgs);
		 var topic = document.querySelector('.topic');
		 topic.insertAdjacentHTML('beforeend', newpost);
	}
		});
	}
	else{
		alert("Empty Bar");
	}
}

function insertNewContent(){
	var newContent = document.getElementById("get-content").value;
	if (newContent) {
		 var gameID = getGamename();
		 var pos = getPos();
		 alert(gameID);
		 alert(pos);
		 storeContent(gameID, pos,newContent, function(err){

			if (err) {
			  alert("Unable to save post.  Got this error:\n\n" + err);
			} else {

				var postTemplate = Handlebars.templates.oneContent;
				var templateArgs = {
					content: newContent
				};
		var newpost = postTemplate(templateArgs);
		 var topic = document.querySelector('.in-post');
		 topic.insertAdjacentHTML('beforeend', newpost);
	}
		});
	}
	else{
		alert("Empty Bar");
	}
}

function storePost(gameID, postTitle, postAuthor,callback) {

  var postURL = "/games/"+gameID+"/addpost";

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
	var error;
	if (event.target.status !== 200) {
	  error = event.target.response;
	}
	callback(error);
  });
  
  var postBody = {
    title: postTitle,
    author: postAuthor
  };
  postRequest.send(JSON.stringify(postBody));
}

function storeContent(gameID,pos,postContent,callback) {

  var postURL = "/games/" + gameID + "/" + pos + "/addcontent";

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event) {
	var error;
	if (event.target.status !== 200) {
	  error = event.target.response;
	}
	callback(error);
  });
  
  var postBody = {
    content: postContent
  };
  postRequest.send(JSON.stringify(postBody));
}

function close_contact(){
	document.getElementById("confirm-delete-modal").classList.add('hidden');
}

function create_contact(){
	//alert("YES");
	document.getElementById("create-game-modal").classList.remove('hidden');

}

function close_contact(){
	document.getElementById("create-game-modal").classList.add('hidden');
}
