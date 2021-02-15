  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCG8w1VAnqzmTBm7UJrojtSVY71IU3GybM",
    authDomain: "firwbasejavas.firebaseapp.com",
    projectId: "firwbasejavas",
    storageBucket: "firwbasejavas.appspot.com",
    messagingSenderId: "376795258568",
    appId: "1:376795258568:web:2993ca0112d45d4306cffd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



const addbutton = document.querySelector('.add-button');
var input = document.querySelector('.input');
var date = document.querySelector('.date');
const todolist = document.querySelector('.todo-list');
const poplist = document.querySelector('.poplist');
const select__item =document.querySelector('.select__item');
const selectcheck__item =document.querySelector('.select-check__item');

const select__deleteall = document.querySelector('.select__deleteall');
const inputcheckbox = document.getElementById('input-checkbox');

var nameV,dateV;

class item{
    createDiv(itemname,itemdate){

        let input = document.createElement('input');
        input.value =itemname;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        let date = document.createElement('input');
        date.value =itemdate;
        date.disabled = true;
        date.classList.add('item_date');
        date.type = 'date';

        this.addfirebase();
        this.addCookies();
        this.savelocaltodo(itemname,itemdate);
        
        
        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        //let editButton = document.createElement('button');
        //editButton.innerHTML = '<i class="fa fa-edit" href="#myModal"></i>';
        //editButton.classList.add('editButton');

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
        itemBox.appendChild(date);
        itemBox.appendChild(comButton);
        //itemBox.appendChild(editButton);
        itemBox.appendChild(deleteButton);
              
        todolist.appendChild(itemBox);

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
            this.removefirebase(itemBox);
            this.removecookies(itemBox);
            itemBox.addEventListener('transitionend', () => {
                itemBox.remove();
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

    savelocaltodo(input,date){

        let todos;
        if(localStorage.getItem('todos') === null){
            todos =[];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        var useritem={input,date};
        todos.push(useritem);
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
            input.value =todo.input;
            input.disabled = true;
            input.classList.add('item_input');
            input.type = 'text';
            
            let date = document.createElement('input');
            date.value =todo.date;
            date.disabled = true;
            date.classList.add('item_date');
            date.type = 'text';

            let itemBox = document.createElement('div');
            itemBox.classList.add('item');
    

            //let editButton = document.createElement('button');
            //editButton.innerHTML = '<i class="fa fa-edit"></i>';
            //editButton.classList.add('editButton');
    
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
            itemBox.appendChild(date);
            itemBox.appendChild(comButton);
            //itemBox.appendChild(editButton);
            itemBox.appendChild(deleteButton);
            
            
            todolist.appendChild(itemBox);

            comButton.addEventListener('click', ()=> this.complate(comButton));
            //editButton.addEventListener('click', ()=> this.edit(editButton));
            deleteButton.addEventListener('click', ()=> this.remove(deleteButton));
            select__item.addEventListener('change',()=> this.filtertodo(event));
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
        todos.forEach(function(todo){
            if(todoIndex == todo.input){
                todos.splice(todos.indexOf(todo),1);
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        });
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
        //let user =todo.children[1].value;
        var user=prompt("Enter : ",todoIndex);
        if(user ===""){
            alert("Empty edit value.....");    
        }if(user !==""){
            todos.forEach(function(todo){
                //console.log(todo.input);
                if(todoIndex == todo.input){
                    //console.log(todos.indexOf(todo));
                    var index=todos.indexOf(todo);
                    console.log(todo);
                    console.log(todos[index].input=user);
                    todos.splice(todos[index].input,1,user);
                    //localStorage.setItem("todos", JSON.stringify(todos));
                }
            });
            //todos.splice(todos.indexOf(todoIndex),1,user);
            //localStorage.setItem('todos',JSON.stringify(todos));
            this.Ready();
            firebase.database().ref('todolist/'+todoIndex).update({
            Name: user
            });
        }

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
                        this.removefirebase(item);
                        this.removecookies(item);
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

    Ready(){
        nameV = document.getElementById('inputbox').value;
        dateV = document.getElementById('datebox').value;
    }

    addfirebase(){
        this.Ready();
        firebase.database().ref('todolist/'+nameV).set({
            Name: nameV,
            Date: dateV
        });
        //setTimeout("location.reload(true);", 1000);
    }
    addCookies(){
        Cookies.set(input.value, date.value, { expires: 1 });
        //location.reload()
        //setTimeout("location.reload(true);", 1000);
    }
    removefirebase(itemBox){
        var revalue=itemBox.childNodes[1].value;
        firebase.database().ref('todolist/'+revalue).remove();
    }
    removecookies(itemBox){
        var revalue=itemBox.childNodes[1].value;
        Cookies.remove(revalue);
    }
}

document.addEventListener("DOMContentLoaded", new item().showlocaltodo());

function check(event){
    if(input.value === "" || date.value == ""){
        //event.preventDefault();
        //alert("Enter element ...");
    }
    else{
        event.preventDefault();
        new item().createDiv(input.value,date.value);
        setTimeout("location.reload(true);", 2000);
        alert("Add successfully!");
        input.value = "";
        date.value = "";
    }
}

addbutton.addEventListener('click', check);

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datebox").value = today;
  }
  window.onload = function() {
    getDate();
  };
