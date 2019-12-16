/* Toggle between adding and removing the "responsive" class
 to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nav-overlay") {
        x.className += " responsive";
    } else {
        x.className = "nav-overlay";
    }
}


let addPostBtn = document.querySelector('.create-post-btn');

//event fired when web page document is loaded
document.addEventListener('DOMContentLoaded',async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post)=>{
        let postHTML = `<article class="d-flex justify-content-between align-items-center">
                                <div class="id w5">${post.id}</div>
                                <div class="name w30">${post.title}</div>
                                <div class="date w20">${post.date}</div>
                                <div class="author w15">${post.author}</div>
                                <div class="genre w15">${post.genre}</div>
                                <div class="edit w10"><button class="btn btn-link">Edit</button></div>
                                <div class="remove w5"><button class="btn btn-link" >X</button></div>
                            </article>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

addPostBtn.addEventListener('click', ()=>{
    let articlesTab = document.getElementById('pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createTab = document.getElementById('pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');

});
