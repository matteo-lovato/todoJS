// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");

// Event listener

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

// functions

function addTodo(event) {
  // prevente page to reload on click
  event.preventDefault();

  // create a container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create the real list item
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  // append it to the div container
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(todoInput.value);


  //add a checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // add a trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // attach to UL
  todoList.appendChild(todoDiv);
  // clear input field
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // delete item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // add animation on delete
    todo.classList.add("fall");
    // delete from local storage
    removeLocalTodos(todo);
    // when transition finishes
    todo.addEventListener("transitionend", function () {
      //remove item
      todo.remove();
    });
  }
  // check function
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo (e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value){
      case "all":
        todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = 'none';
        }
        break;
    }
  })
}

//save todo to local storage
function saveLocalTodos(todo){
  let todos;
  // CHECK is there anything?
  if(localStorage.getItem('todos') === null){
    // if empty create a new empty array
    todos = [];
  }else{
    // if there is anything i get it from local storage and parse it
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // then i push the element
  todos.push(todo);
  // transform the array in a string and push in local storage
  localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
  let todos;
  // CHECK is there anything?
  if(localStorage.getItem('todos') === null){
    // if empty create a new empty array
    todos = [];
  }else{
    // if there is anything i get it from local storage and parse it
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create the real list item
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todo;
  // append it to the div container
  todoDiv.appendChild(newTodo);

  //add a checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // add a trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // attach to UL
  todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  if(localStorage.getItem('todos') === null){
    // if empty create a new empty array
    todos = [];
  }else{
    // if there is anything i get it from local storage and parse it
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoText = todo.children[0].innerText;
  const todoIndex = todos.indexOf(todoText)
  todos.splice(todoIndex, 1);

  // refresh local storage
  localStorage.setItem('todos', JSON.stringify(todos));
  
}