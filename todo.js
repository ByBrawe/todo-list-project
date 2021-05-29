
// Tüm elementleri seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");






eventListener();


function eventListener(){



   
    
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUi);
    secondCardBody.addEventListener("click", deleteTodo);

    filter.addEventListener("keyup", filteTodos);
    clearButton.addEventListener("click", clearAllTodos);





}

function filteTodos(e){

    const filtervalue = e.target.value.toLowerCase();;
    const listitems = document.querySelectorAll(".list-group-item");

    listitems.forEach(function(listitem){
        const text = listitem.textContent.toLowerCase();

        if(text.indexOf(filtervalue) === -1){

            listitem.setAttribute("style", " display : none !important; ");



        }else{

            listitem.setAttribute("style", " display : block; ");

        }


    });
}

function clearAllTodos(){

    if(confirm("Tüm todoları silmek istiyor musun?")){

        while(todoList.firstElementChild != null){

            todoList.removeChild(todoList.firstChild);

        }

        localStorage.removeItem("todos");

    }

}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){

        let deleteButton = e.target.parentElement.parentElement

        deleteButton.remove();
        deleteTodoFromStorage(deleteButton.textContent.trim());
        

        showAlert("success","Todo Başarıyla silindi.")

        
        

    }




    e.preventDefault();

}

function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();

    todos.forEach((todo,index)=>{

        if(todo === deletetodo){

            todos.splice(index,1);
            console.log(todo);

        }



    })

    localStorage.setItem("todos", JSON.stringify(todos));





}


function loadAllTodosToUi(){

    let todos = getTodosFromStorage();

    todos.forEach((todo) => {

        addTodoUI(todo);
        
    });

};


function addTodo(e){

    const newToDo = todoInput.value.trim();
    const todos = getTodosFromStorage();
    var x = 0;
    // console.log(e); 

    if(newToDo == ""){

        showAlert("danger","Lütfen bir todo girin...");

    }else{

        todos.forEach((todo)=>{

            if (todo == newToDo){
                x = 1;
                todoInput.value = "";
                showAlert("danger","Böyle bir todo zaten var.");
                
            }

            

        });
        // todo konrol
        if(x !=1){

            addTodoUI(newToDo);
            addTodoToStorage(newToDo);
            showAlert("success","Todo'nuz başarıyla eklendi.");

        }

        

    }
   
    e.preventDefault();
}

function getTodosFromStorage(){

    // todo alma

    let todos;

    if(localStorage.getItem("todos") === null){

        todos = [];
    }else{

        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));    

    
}


function showAlert(type,message){

    const alert = document.createElement("div");
    
    alert.className = "alert alert-"+type;
    alert.textContent = message;

    firstCardBody.appendChild(alert);


    setTimeout(() => {

        alert.remove();

    },1000);



    





}

function addTodoUI(newToDo){

    //    <li class="list-group-item d-flex justify-content-between">
    //    Todo 1
    //    <a href = "#" class ="delete-item">
    //        <i class = "fa fa-remove"></i>
    //    </a>

    //    </li> 


    const listitem = document.createElement("li");
    listitem.className = "list-group-item d-flex justify-content-between"

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listitem.appendChild(document.createTextNode(newToDo));
    listitem.appendChild(link);
   
    todoList.appendChild(listitem);

    todoInput.value = "";


}

