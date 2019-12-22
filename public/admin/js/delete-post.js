let articlesBlock = document.querySelector('.articles');

// using event delegation
// if the clicked item has the class name btn-remove
articlesBlock.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/posts/' + id,
            {
                    method: 'DELETE'
                }).then((resp)=> resp.text())
                    .then(()=> window.history.go());
    }
});
