var button__add = document.querySelector('.button__add');
var form__input = document.querySelector('.form__input');
const todolist = document.querySelector('.todo-list');
const poplist = document.querySelector('.poplist');
const form__select =document.querySelector('.form__select');
const selectcheck__select =document.querySelector('.select-check__select');

const inputcheckbox = document.getElementById('input-checkbox');
var tasks=[];

class item{
    createDiv(itemname){
        let input = document.createElement('input');
        input.value =itemname;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = 'text';

        //var index = tasks.length+1;
        tasks.push({ "name": itemname });
        //tasks.push({ "id":index,"name": itemname });
        this.setCookie('todolist', tasks,1);

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-edit"></i><div';
        editButton.classList.add('btn__edit');
        editButton.classList.add('btn__blue');

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.classList.add('btn__delete');
        deleteButton.classList.add('btn--red');

        let comButton = document.createElement('button');
        comButton.innerHTML = '<i class="fa fa-check"></i>';
        comButton.classList.add('btn__complate');
        comButton.classList.add('btn--green');

        let checkboxButton = document.createElement('input');
        checkboxButton.setAttribute('type','checkbox');
        checkboxButton.classList.add('btn__check');

        itemBox.appendChild(checkboxButton);
        itemBox.appendChild(input);
        itemBox.appendChild(comButton);
        itemBox.appendChild(editButton);
        itemBox.appendChild(deleteButton);
              
        todolist.appendChild(itemBox);

        location.reload();

    }


    edit(item){
        if(item.classList[0] === "btn__edit"){
            const itemBox =item.parentElement;
            this.editcookies(itemBox);
            location.reload();

        }
    }
    
    remove(item){
        if(item.classList[0] === "btn__delete"){
            const itemBox =item.parentElement;
            console.log(itemBox.childNodes);    
            let val=itemBox.childNodes[1].value;
            itemBox.classList.add('fall');
            this.removecookies(val);
            itemBox.addEventListener('transitionend', () => {
                itemBox.remove();
                location.reload();
            });
        }
        

    }

    complate(item){
        if(item.classList[0] === "btn__complate"){
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
    
    
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    init() {
        // debugger;
        tasks = this.getCookie('todolist');
        // debugger;
        if (typeof tasks != "" && tasks != "") {
            tasks = JSON.parse(tasks);
        } else {
            tasks = [];
        }
    }
    

    removecookies(itemname){
        tasks = this.getCookie('todolist');
        tasks = JSON.parse(tasks);
        for (let index = 0; index < tasks.length; index++) {
            if (tasks[index].name==itemname) {
                tasks.splice(index,1);
                console.log(tasks);
                this.setCookie('todolist', tasks,1);
            }   
        }
    }

    editcookies(itemBox){
        let val=itemBox.childNodes[1].value;
        console.log(val);
        let user=prompt("Enter : ",val);
        tasks = this.getCookie('todolist');
        tasks = JSON.parse(tasks);
        for (let index = 0; index < tasks.length; index++) {
            if (tasks[index].name==val) {
                tasks.splice(index,1,{name:user});
                this.setCookie('todolist', tasks,1);
            }
            
        }
    }

    showCookie(cname) {
        tasks = this.getCookie('todolist');
        tasks = JSON.parse(tasks);
        let index = 0;
        while(index<tasks.length){
            let input = document.createElement('input');
            input.value =(tasks[index].name);
            input.disabled = true;
            input.classList.add('item_input');
            input.type = 'text';
        
            let itemBox = document.createElement('div');
            itemBox.classList.add('item');
        
    
            let editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fa fa-edit"></i>';
            editButton.classList.add('btn__edit');
            editButton.classList.add('btn--blue');
        
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            deleteButton.classList.add('btn__delete');
            deleteButton.classList.add('btn--red');
        
            let comButton = document.createElement('button');
            comButton.innerHTML = '<i class="fa fa-check"></i>';
            comButton.classList.add('btn__complate');
            comButton.classList.add('btn--green');
                
            let checkboxButton = document.createElement('input');
            checkboxButton.setAttribute('type','checkbox');
            checkboxButton.classList.add('btn__check');
                
            itemBox.appendChild(checkboxButton);
            itemBox.appendChild(input);
            itemBox.appendChild(comButton);
            itemBox.appendChild(editButton);
            itemBox.appendChild(deleteButton);
                
                
            todolist.appendChild(itemBox);
    
            comButton.addEventListener('click', ()=> this.complate(comButton));
            editButton.addEventListener('click', ()=> this.edit(editButton));
            deleteButton.addEventListener('click', ()=> this.remove(deleteButton));
            form__select.addEventListener('change',()=> this.filtertodo(event));
            checkboxButton.addEventListener('click', ()=> this.checkselectAll(todolist));        
            selectcheck__select.addEventListener('change', ()=> this.checked(selectcheck__select));
            inputcheckbox.addEventListener('click', ()=> this.SelectAll(inputcheckbox));
            
            index++;
        }
    }
   
    checked(item){
        let cmtbybox = todolist.childNodes;
        switch(item.value){
            case 'delete':
                cmtbybox.forEach(item=>{
                    if(item.childNodes[0].checked){
                        let val=item.childNodes[1].value;
                        item.classList.add("fall");
                        inputcheckbox.checked=false;
                        this.removecookies(val);
                        item.addEventListener('transitionend',function(){
                        item.remove();
                        location.reload();
                    });
                }
                selectcheck__select.value="";
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
                    selectcheck__select.value="";
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
                    selectcheck__select.value="";
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

//new item().init();
document.addEventListener("DOMContentLoaded", new item().init());
document.addEventListener("DOMContentLoaded", new item().showCookie('todolist'));
function check(event){
    if(form__input.value === ""){
        event.preventDefault();
        alert("Please enter your name ...");
    }
    else{
        event.preventDefault();
        new item().createDiv(form__input.value);
        alert("Add done ...");
        form__input.value = "";
    }
}

button__add.addEventListener('click', check);
