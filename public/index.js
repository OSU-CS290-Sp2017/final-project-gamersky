
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

function generateNewPost(postLink,postTitle,postAuthor){
	var postTemplate = Handlebars.templates.onePost;
	var postData = {
		link: postLink,
		title: postTitle,
		author: postAuthor
	}
	return postTemplate(postData);
}

function generateNewContent(newContent){
	var contentTemplate = Handlebars.templates.oneContent;
	var contentData = {
		content: newContent	
	}
	
	return contentTemplate(contentData);
}

function insertNewPost(){
	var postLink = "#";
	var postTitle = document.getElementById("get-title").value;
	var postAuthor = document.getElementById("get-name").value;
	if (postTitle && postAuthor) {
		 var newPost = generateNewPost(postLink,postTitle,postAuthor);
		 var topic = document.querySelector('.topic');
		 topic.insertAdjacentHTML('beforeend', newPost);
	}
	else{
		alert("Empty Bar");
	}
}

function insertNewContent(){
	var newContent = document.getElementById("get-content").value;
	if(newContent){
		var ContentTemp = generateNewContent(newContent);
		var in_post = document.querySelector('.in-post');
		in_post.insertAdjacentHTML('beforeend', ContentTemp);
	}
	else{
		alert("Empty Bar");
	}
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

/*function search(){
	var str = document.getElementById("navbar-search-input").value;
	var twit = document.getElementsByClassName("twit");
	var texts = document.getElementsByClassName("twit-text");
	var authors = document.getElementsByClassName("twit-attribution");
	for(i=0;i<num_twit;i++){
		if(texts[i].innerHTML.includes(str)||authors[i].innerHTML.includes(str)){
			twit[i].style.display = "block";
		}
		else twit[i].style.display = "none";
	}
}*/

