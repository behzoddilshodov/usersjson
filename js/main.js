// Get
let elUsersWrapper = document.querySelector(".users__wrapper");
let elPostsWrapper = document.querySelector(".posts__wrapper");
let elCommentsWrapper = document.querySelector(".comments__wrapper")
let elTempUsers = document.querySelector("#user__template").content;
let elTempPosts = document.querySelector("#post__template").content;
let elCommentTemplate = document.querySelector("#comments__template").content
let elUsersResult = document.querySelector(".users__result");
let elPostsResult = document.querySelector(".posts__result");
let elCommentsResult = document.querySelector(".comments__result");


function renderUsers(array) {
   
    elUsersResult.textContent = array.length
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newLi = elTempUsers.cloneNode(true);
        
       
        newLi.querySelector(".user__link").dataset.userId = item.id;
        newLi.querySelector(".user__name").textContent = item.name
        newLi.querySelector(".user__username").textContent = item.username
        newLi.querySelector(".user__email").textContent = item.email
        
        newFragment.appendChild(newLi);
    }
    
    elUsersWrapper.appendChild(newFragment);
}

function renderPosts(array) {
    elPostsResult.textContent = array.length
    elPostsWrapper.innerHTML = null;
    
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newLi = elTempPosts.cloneNode(true);
        
        newLi.querySelector(".post__id").textContent = item.id;
        newLi.querySelector(".post__link").dataset.postId = item.id;
        newLi.querySelector(".post__link").textContent = item.title;
        newLi.querySelector(".post__body").textContent = item.body;
        
        newFragment.appendChild(newLi);
    }
    
    elPostsWrapper.appendChild(newFragment);
}

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(json => renderUsers(json))


elUsersWrapper.addEventListener("click", function(evt) {
    let datasetId = evt.target.dataset.userId;
    
    
    if (datasetId) {
        fetch(`https://jsonplaceholder.typicode.com/users/${datasetId}/posts`)
        .then(response => response.json())
        .then(json => renderPosts(json))
    }
})

function renderComment(array, wrapper) {
    wrapper.innerHTML = null;
    elCommentsResult.textContent = array.length
    
    
    let newFragment = document.createDocumentFragment();
    
    for (const item of array) {
        let newItem = elCommentTemplate.cloneNode(true);
        
        newItem.querySelector(".comments__id").textContent = item.id
        // newItem.querySelector("comments_body").textContent = item.body
        newItem.querySelector(".comments__link").textContent = item.email
        
        
        newFragment.appendChild(newItem);
        
        console.log(newItem);
        
    }
    
    wrapper.appendChild(newFragment)
}



elPostsWrapper.addEventListener("click", function(evt) {
    let lolid = evt.target.dataset.postId;
    
    
    if (lolid) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${lolid}/comments`)
        .then(response => response.json())
        .then(json => renderComment(json, elCommentsWrapper))
    }
})