let todolistEl = document.getElementById("todolistcont");
let inputId = document.getElementById("inp-id");
let errorMsg = document.getElementById("error");


let todoList = [
    {
        title : "html",
        id : 1  
    },
    
    {
        title : "css",
        id : 2
    },
    {
        title : "javascript",
        id : 3
    }
]


//by click on checkbox it show line-through on title
function  onstatusChange(checkBoxId,titleId)
{
    let checkboxElement = document.getElementById(checkBoxId);
    let titileElement = document.getElementById(titleId);

    if(checkboxElement.checked===true)
    {
      titileElement.classList.add("checked");
    }
    else
    {
     titileElement.classList.remove("checked");
    }
}

function  onDeleteTodo(todoId)
{
  let todoEle = document.getElementById(todoId);
  todolistEl.removeChild(todoEle); 

  let newTodoID = todoId.slice(4); // providing id of the todolist todoId=todo1,todo2  by using slice it only give 4 element that is 1, 2, 3;
//   console.log(newTodoID);

  let index = todoList.findIndex((each)=>each.id==newTodoID);
//   console.log(index);

  todoList.splice(index,1);
  console.log(todoList);
}
function createAndAppendtodo(todo)
{
    // console.log(todo);
    let checkBoxId = "xyz" + todo.id;
    let titleId = "title" + todo.id;
    let todoId = "todo" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todolistEl.appendChild(listCont);

    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkBoxId;
    // checkboxEl.checked = "true";
    checkboxEl.onclick = function (){
        onstatusChange(checkBoxId,titleId);
    }
    
    listCont.appendChild(checkboxEl);
    
    

    let lableEl = document.createElement("label");
    lableEl.classList.add("lable-card");
    lableEl.htmlFor= checkBoxId;
    listCont.appendChild(lableEl);
    

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    lableEl.appendChild(titleEl);

    //18-10-24

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function()
    {
        onDeleteTodo(todoId);
    }
    lableEl.appendChild(deleteBtn);

    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash")
    deleteBtn.appendChild(trashIcon);
}
for(each of todoList)
{
    
    // let headingEl = document.createElement("h1");
    // headingEl.textContent = each.title;

    // todolistEl.appendChild(headingEl);

    createAndAppendtodo(each);
}
  
function onAddtodo(){
//    console.log(inputId.value);


    let todoId = todoList.length+1;

    let newTodo = {
    title : inputId.value,
    id : todoId
}


if(inputId.value==="")
    {
        errorMsg.textContent = "Please enter some value";
    }
    else
    {
        createAndAppendtodo(newTodo);
        errorMsg.textContent = "";
        inputId.value=" ";
        todoList.push(newTodo);
    }



}