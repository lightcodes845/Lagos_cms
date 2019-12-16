


document.addEventListener('DOMContentLoaded',async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.row-articles');
    articles.innerHTML = '';
    posts.forEach((post)=>{
        let postHTML = `
            <div class="col-12 col-md-6 ">
            <article>
                <div class="article-left">
                    <img src="${post.imageURL}" alt="${post.title}">
                </div>
                <div class="article-right">
                    <h3>${post.title}</h3>
                    <p class="meta">
                        <span class="date">${post.date}</span>
                        <span class="author">by ${post.author}</span>
                        <span class="category">${post.genre}</span>
                    </p>
                    <p class="description">
                        ${post.description}    
                    </p>
                    <p class="additional">
                        <span class="views"><i class="fas fa-eye"></i> 266</span>
                        <span class="comments"><i class="fas fa-comments"></i> 3</span>
                        <button class="btn btn-primary btn-details">Details</button>
                    </p>

                </div>
            </article>
           </div>
`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    })
})
