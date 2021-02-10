/*var firebaseConfig = {
    apiKey: "AIzaSyDtS8QCvIqCa62tqfIVYcEcHQRZCV613N4",
    authDomain: "todolist-63214.firebaseapp.com",
    databaseURL: "https://todolist-63214-default-rtdb.firebaseio.com",
    projectId: "todolist-63214",
    storageBucket: "todolist-63214.appspot.com",
    messagingSenderId: "780253184309",
    appId: "1:780253184309:web:5841cb837d48f4fc7f4c7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var namev,datev;
  function ready(){
    namev=document.getElementById('input').value;
    datev=document.getElementById('date').value;
  }
  
  //Insert Firebase___
  document.getElementsByClassName('add-button').onclick = function(){
    ready();
    firebase.database().ref('todolist/'+namev).set({
    Name: namev,
    Date: datev
    });
  }
*/
const addbutton = document.querySelector('.add-button');
var input = document.querySelector('.input');
var date = document.querySelector('.date');
const todolist = document.querySelector('.todo-list');
const poplist = document.querySelector('.poplist');
const select__item =document.querySelector('.select__item');
const selectcheck__item =document.querySelector('.select-check__item');

const select__deleteall = document.querySelector('.select__deleteall');
const inputcheckbox = document.getElementById('input-checkbox');


class item{
    createDiv(itemname){

        let input = document.createElement('input');
        input.value =itemname;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        this.savelocaltodo(itemname);
        Cookies.set(input.value, date.value, { expires: 1 });

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-edit" href="#myModal"></i>';
        editButton.classList.add('editButton');

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('deleteButton');

        let comButton = document.createElement('button');
        comButton.innerHTML = '<i class="fa fa-check"></i>';
        comButton.classList.add('comButton');

        let checkboxButton = document.createElement('input');
        checkboxButton.setAttribute('type','checkbox');
        checkboxButton.classList.add('checkboxButton');

        itemBox.appendChild(checkboxButton);
        itemBox.appendChild(input);
        itemBox.appendChild(comButton);
        itemBox.appendChild(editButton);
        itemBox.appendChild(deleteButton);
              
        todolist.appendChild(itemBox);

        firebase.database().ref('todolist/'+input).set({
            Name: inputname,
            Date: inputdate
        });
        
        location.reload();
    }

    edit(item){

        if(item.classList[0] === "editButton"){
            const itemBox =item.parentElement;
            this.editlocaltodo(itemBox);
            location.reload();

        }
    }
    
    remove(item){

        if(item.classList[0] === "deleteButton"){
            const itemBox =item.parentElement;
            itemBox.classList.add('fall');
            this.removelocaltodo(itemBox);
            itemBox.addEventListener('transitionend', () => {
                itemBox.remove();
                Cookies.remove(itemBox.childNodes[1].value);
                location.reload();
            });
            
        }

    }

    complate(item){

        if(item.classList[0] === "comButton"){
            const itemBox =item.parentElement;
            itemBox.classList.toggle('complated');
        }

    }

    filtertodo(e){

        const todos = todolist.childNodes;
        todos.forEach(function(todo){
            switch(e.target.value)
            {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'complated':
                    if(todo.classList.contains('complated')){
                        todo.style.display = 'flex';
                    }
                    else{
                        todo.style.display = 'none';
                    }
                    break;
                case 'uncomplated':
                    if(!todo.classList.contains('complated')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                    break;
            }
        });

    }

    savelocaltodo(input){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.push(input);
        localStorage.setItem('todos',JSON.stringify(todos));

    }

    showlocaltodo(){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.forEach(function(todo){
            let input = document.createElement('input');
            input.value =todo;
            input.disabled = true;
            input.classList.add('item_input');
            input.type = 'text';
    
    
            let itemBox = document.createElement('div');
            itemBox.classList.add('item');
    

            let editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fa fa-edit"></i>';
            editButton.classList.add('editButton');
    
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.classList.add('deleteButton');
    
            let comButton = document.createElement('button');
            comButton.innerHTML = '<i class="fa fa-check"></i>';
            comButton.classList.add('comButton');
            
            let checkboxButton = document.createElement('input');
            checkboxButton.setAttribute('type','checkbox');
            checkboxButton.classList.add('checkboxButton');
            
            itemBox.appendChild(checkboxButton);
            itemBox.appendChild(input);
            itemBox.appendChild(comButton);
            itemBox.appendChild(editButton);
            itemBox.appendChild(deleteButton);
            
            
            todolist.appendChild(itemBox);

            comButton.addEventListener('click', ()=> this.complate(comButton));
            editButton.addEventListener('click', ()=> this.edit(editButton));
            deleteButton.addEventListener('click', ()=> this.remove(deleteButton));
            select__item.addEventListener('change',()=> this.filtertodo(event));
            select__deleteall.addEventListener('click',()=> this.deleteAll());
            checkboxButton.addEventListener('click', ()=> this.checkselectAll(todolist));
            
        }, this);
        selectcheck__item.addEventListener('change', ()=> this.checked(selectcheck__item));
        inputcheckbox.addEventListener('click', ()=> this.SelectAll(inputcheckbox));

    }

    removelocaltodo(todo){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        const todoIndex =todo.children[1].value;
        todos.splice(todos.indexOf(todoIndex),1);
        localStorage.setItem("todos", JSON.stringify(todos));

    }

    editlocaltodo(todo){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        let todoIndex =todo.children[1].value;
        var user=prompt("Enter : ",todoIndex);
        if(user === ""){
            alert("Empty edit value.....");    
        }else{
            todos.splice(todos.indexOf(todoIndex),1,user);
            localStorage.setItem('todos',JSON.stringify(todos));
        }

    }

    deleteAll(){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos=[];
        localStorage.setItem("todos", JSON.stringify(todos));

    }
   
   
    checked(item){
        let cmtbybox = todolist.childNodes;
        switch(item.value){
            case 'delete':
                cmtbybox.forEach(item=>{
                    if(item.childNodes[0].checked){
                        item.classList.add("fall");
                        inputcheckbox.checked=false;
                        this.removelocaltodo(item);
                        item.addEventListener('transitionend',function(){
                        item.remove();
                    });
                }
                selectcheck__item.value="";
            }, this);
            break;
            case 'completed':
                cmtbybox.forEach(item=>{
                    if(item.childNodes[0].checked)
                    {
                        if (item.classList.contains("complated")) {
                            item.children[0].checked = false;
                            inputcheckbox.checked=false;
                        }
                        else{
                            item.classList.toggle("complated");
                            item.children[0].checked = false;
                            inputcheckbox.checked=false;
                        }
                    }
                    selectcheck__item.value="";
                });
            break;    
            case 'uncomplated':
                cmtbybox.forEach(item=>{
                    if(item.childNodes[0].checked)
                    {
                        if (!item.classList.contains("complated")) {
                            item.children[0].checked = false;
                            inputcheckbox.checked=false;
                        }
                        else{
                            item.classList.toggle("complated");
                            item.children[0].checked = false;
                            inputcheckbox.checked=false;
                        }   
                    }
                    selectcheck__item.value="";
                });
            break;
        }
    }

    SelectAll(item){

        let selectbox = todolist.childNodes;
        if(selectbox.length === 0)
        {
            item.checked = false
            alert("No Data Available...");
        }
        else{
            if(item.checked){
                selectbox.forEach(item=>{
                    item.children[0].checked = true;
                })
            }
            if(item.checked === false){
                selectbox.forEach(item=>{
                    item.children[0].checked = false;
                })
            }
        }

    }

    checkselectAll(item){
        let selectbox = item.childNodes;
        let count=0;
        selectbox.forEach(item=>{
            if (item.children[0].checked === true){
                count++
            }
        });
        if(selectbox.length==count){
            inputcheckbox.checked=true;
        }else{
            inputcheckbox.checked=false;
        }
    }
}

document.addEventListener("DOMContentLoaded", new item().showlocaltodo());

function check(event){
    if(input.value === "" || date.value == ""){
        event.preventDefault();
        alert("Empty list element.....");
    }
    else{
        event.preventDefault();
        new item().createDiv(input.value);
        input.value = "";
    }
}

addbutton.addEventListener('click', check);