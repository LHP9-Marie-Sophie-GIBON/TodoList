let btnGroup = document.querySelector('#btnGroup');
let Ajout = document.querySelector('#Ajout');
let item = document.querySelector('#item');
let newItem = document.querySelectorAll(".newItem");


//Fonction local storage
function SaveInLocalStorage() {
    let newItems = document.querySelectorAll('.newItem');
    const TodoList = [];
    newItems.forEach(element => { TodoList.push(element.value); })

    let ok = document.querySelectorAll('.complete');
    const okArray = [];
    ok.forEach(element => {
        okArray.push(element.className);
    })


    localStorage.setItem('okArray', JSON.stringify(okArray));
    localStorage.setItem('TodoList', JSON.stringify(TodoList));
}

// bouton ajout
Ajout.addEventListener('click', function () {
    let newbtnGroup = document.createElement('fieldset');
    newbtnGroup.innerHTML = `<div class="btn-group" role="group">
    <button type="button" class="btn m-3"><img class="ok complete" src="https://img.icons8.com/color-glass/28/null/checkmark--v1.png"/> </button>    
    <input type="text" class="newItem form-control m-4" placeholder="" value="${item.value}" disabled/>
    <button type="button" class="btn m-3"><img class="Editer" src="https://img.icons8.com/color-glass/38/null/edit--v1.png"/> </button>    
    <button type="button" class="btn m-3"><img class="Supprimer" src="https://img.icons8.com/fluency/38/null/delete-forever.png"/> </button> 
    </div>`
    btnGroup.appendChild(newbtnGroup);
    SaveInLocalStorage()
})

window.addEventListener("click", event => {
    // bouton supprimer
    if (event.target.classList == "Supprimer") {
        document.querySelector('#btnGroup').removeChild(document.querySelector('#btnGroup').lastChild)
    }
    // bouton editer/valider   
    if (event.target.classList == "Editer") {
        event.target.parentNode.parentNode.children[1].disabled = false;
        event.target.className = "valider"
        event.target.src = 'https://img.icons8.com/color-glass/38/null/verified-account--v1.png';
    } else if (event.target.classList == "valider") {
        event.target.parentNode.parentNode.children[1].disabled = true;
        event.target.className = "Editer"
        event.target.src = 'https://img.icons8.com/color-glass/38/null/edit--v1.png';
    }
    // bouton done
    if (event.target.classList == "ok complete") {
        event.target.className = "notok complete"
        event.target.src = 'https://img.icons8.com/color-glass/28/null/double-tick--v1.png'
        event.target.parentNode.parentNode.children[1].className = "newItem form-control m-4 lineThrough";
    } else if (event.target.classList == "notok complete") {
        event.target.className = "ok complete"
        event.target.src = 'https://img.icons8.com/color-glass/28/null/checkmark--v1.png'
        event.target.parentNode.parentNode.children[1].className = "newItem form-control m-4";

    }
    SaveInLocalStorage()
})

// reload le contenu de la page au chargement
document.addEventListener('DOMContentLoaded', function () {
    let local = JSON.parse(localStorage.getItem('TodoList'));
    let local2 = JSON.parse(localStorage.getItem('okArray'));
    let i = 0;

    local.forEach(element => {
        let newbtnGroup = document.createElement('fieldset');
        newbtnGroup.innerHTML = `<div class="btn-group" role="group">
    <button type="button" class="btn m-3"><img class="${local2[i]}" src="${local2[i] == 'ok complete' ? "https://img.icons8.com/color-glass/28/null/checkmark--v1.png" : "https://img.icons8.com/color-glass/28/null/double-tick--v1.png"}"/> </button>    
    <input type="text" class="newItem ${local2[i] == 'notok complete' ? 'lineThrough' : ''} form-control m-4" placeholder="" value="${element}" disabled/>
    <button type="button" class="btn m-3"><img class="Editer" src="https://img.icons8.com/color-glass/38/null/edit--v1.png"/> </button>    
    <button type="button" class="btn m-3"><img class="Supprimer" src="https://img.icons8.com/fluency/38/null/delete-forever.png"/> </button> 
    </div>`
        document.querySelector('#btnGroup').appendChild(newbtnGroup);
        SaveInLocalStorage()
        i++;
    })



});