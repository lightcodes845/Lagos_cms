let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let author = document.querySelector('#author');
let genre = document.querySelector('#genre');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');

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
        fetch('http://localhost:3000/posts', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
              title: createTitle.value,
              author: author.value,
              genre: genre.value,
              imageURL: createImageUrl.value,
              text: createText.value,
              description: createText.value.substring(0,createText.value.indexOf('.')+1)
           })
        }).then((response)=> response.text())
            .then((data) => window.history.go());
    }

})
