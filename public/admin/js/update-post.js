{
    let articlesBlock = document.querySelector('.articles');
    let titleInp = document.querySelector('#update-title');
    let authorInp = document.querySelector('#update-author');
    let genreInp = document.querySelector('#update-genre');
    let textInp = document.querySelector('#update-text');
    let updateForm = document.querySelector('.update-post-form');
    let imageURL = document.querySelector('#update-image-url');
    let imageFile = document.querySelector('#update-image-file');
    let imageDiv = document.querySelector('.image');

    let id;
    let valid = false;

    titleInp.addEventListener('keypress', ()=>{
        if (this.value === ""){
            titleInp.classList.add('error');
            document.querySelector('.update-title').style.display = 'block';
        } else {
            titleInp.classList.remove('error');
            document.querySelector('.update-title').style.display = 'none';
        }
    });

    authorInp.addEventListener('keypress', ()=>{
        if (this.value === ""){
            authorInp.classList.add('error');
            document.querySelector('.update-authorname').style.display = 'block';
        } else {
            authorInp.classList.remove('error');
            document.querySelector('.update-authorname').style.display = 'none';
        }
    });

    textInp.addEventListener('keypress', ()=>{
        if (this.value === ""){
            textInp.classList.add('error');
            document.querySelector('.update-text').style.display = 'block';
        } else {
            textInp.classList.remove('error');
            document.querySelector('.update-text').style.display = 'none';
        }
    });


// using event delegation
// if the clicked item has the class name btn-remove
    articlesBlock.addEventListener('click', async(e)=>{
        if(e.target.classList.contains('btn-edit')){
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((resp)=> resp.json())
                .then((data)=>data);


            titleInp.value = postInfo.title;
            authorInp.value = postInfo.author;
            genreInp.value = postInfo.genre;
            textInp.value = postInfo.text;
            var elem = document.createElement('img');
            elem.src = `${postInfo.imageURL}`;
            imageDiv.appendChild(elem);
            let articlesTab = document.getElementById('pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');

            let updateTab = document.getElementById('pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
        }
    });

    updateForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        if (titleInp.value === ""){
            titleInp.classList.add('error');
            document.querySelector('.update-title').style.display = 'block';
        }
        if (authorInp.value === ""){
            authorInp.classList.add('error');
            document.querySelector('.update-authorname').style.display = 'block';
        }
        if (textInp.value === ""){
            textInp.classList.add('error');
            document.querySelector('.update-text').style.display = 'block';
        }

        if (titleInp.value !== "" & authorInp.value !== "" & textInp.value !== ""){
            valid = true;
        }

        if(valid) {

            // Form data is used to upload files to the server
            let data = new FormData();
            data.append('title', titleInp.value);
            data.append('author', authorInp.value);
            data.append('genre', genreInp.value);
            data.append('text', textInp.value);
            data.append('imageURL', imageURL.value);
            data.append('description', textInp.value.substring(0, textInp.value.indexOf('.') + 1));
            data.append('imageFile', imageFile.files[0])

            fetch('http://localhost:3000/posts' + id, {
                method: 'PUT',
                body: data
            }).then((response) => response.text())
                .then((data) => window.history.go());
        }
    });

}

