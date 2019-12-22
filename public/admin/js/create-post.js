let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let author = document.querySelector('#author');
let genre = document.querySelector('#genre');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');

let valid = false;

createTitle.addEventListener('keypress', ()=>{
   if (this.value === ""){
       createTitle.classList.add('error');
       document.querySelector('.title').style.display = 'block';
   } else {
       createTitle.classList.remove('error');
       document.querySelector('.title').style.display = 'none';
   }
});

author.addEventListener('keypress', ()=>{
    if (this.value === ""){
        author.classList.add('error');
        document.querySelector('.authorname').style.display = 'block';
    } else {
        author.classList.remove('error');
        document.querySelector('.authorname').style.display = 'none';
    }
});

createText.addEventListener('keypress', ()=>{
    if (this.value === ""){
        createText.classList.add('error');
        document.querySelector('.text').style.display = 'block';
    } else {
        createText.classList.remove('error');
        document.querySelector('.text').style.display = 'none';
    }
});

createForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    if (createTitle.value === ""){
        createTitle.classList.add('error');
        document.querySelector('.title').style.display = 'block';
    }
    if (author.value === ""){
        author.classList.add('error');
        document.querySelector('.authorname').style.display = 'block';
    }
    if (createText.value === ""){
        createText.classList.add('error');
        document.querySelector('.text').style.display = 'block';
    }

    if (createTitle.value !== "" & author.value !== "" & createText.value !== ""){
        valid = true;
    }
    if(valid){

        // Form data is used to upload files to the server
        let data = new FormData();
        data.append('title', createTitle.value);
        data.append('author', author.value);
        data.append('genre', genre.value);
        data.append('text', createText.value);
        data.append('imageURL', createImageUrl.value);
        data.append('description', createText.value.substring(0,createText.value.indexOf('.')+1));
        data.append('imageFile', createImageFile.files[0])

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: data
        }).then((response)=> response.text())
            .then((data) => window.history.go());

        // Method used to send JSON object to the server
        // fetch('http://localhost:3000/posts', {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify({
        //       title: createTitle.value,
        //       author: author.value,
        //       genre: genre.value,
        //       imageURL: createImageUrl.value,
        //       text: createText.value,
        //       description: createText.value.substring(0,createText.value.indexOf('.')+1)
        //    })
        // }).then((response)=> response.text())
        //     .then((data) => window.history.go());
    }

})

function disableInput(input1, input2) {
    if (input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = true;
    }
}

createImageUrl.addEventListener('change', ()=>{
    disableInput(this, createImageFile);
})
createImageFile.addEventListener('change', ()=>{
    disableInput(this, createImageUrl);
})
