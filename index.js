let todolistEl = document.getElementById("todolistcont");
let inputId = document.getElementById("inp-id");
let errorMsg = document.getElementById("error");





// let todoList = [
//     {
//         title : "html",
//         id : 1  
//     },
    
//     {
//         title : "css",
//         id : 2
//     },
//     {
//         title : "javascript",
//         id : 3
//     }
// ]

function onGetParsedtodo()
{
    let myTodoList = localStorage.getItem("myTodoList");

    if(myTodoList===null)
    {
        return [];
    }
    else{
        let parsedTodo = JSON.parse(myTodoList);
        return parsedTodo;
    }
}

let todoList = onGetParsedtodo();


//by click on checkbox it show line-through on title
function  onstatusChange(checkBoxId,titleId,todoId)
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

    let newTodoID = todoId.slice(4); // providing id of the todolist todoId=todo1,todo2  by using slice it only give 4 element that is 1, 2, 3;
//   console.log(newTodoID);

  let index = todoList.findIndex((each)=>each.id==newTodoID);

  for(let i=0; i<todoList.length; i++)
  {
    if(index ===i)
    {
        if(todoList[i].isChecked===false)
        {
            todoList[i].isChecked=true;
        }
        else
        {
            todoList[i].isChecked=false;
        }
    }
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
    if(todo.isChecked===true)
        {
            checkboxEl.checked=true;
        }
    checkboxEl.id = checkBoxId;
    // checkboxEl.checked = "true";
    checkboxEl.onclick = function (){
        onstatusChange(checkBoxId,titleId,todoId);
    }
    
    listCont.appendChild(checkboxEl);
    
    

    let lableEl = document.createElement("label");
    lableEl.classList.add("lable-card");
    lableEl.htmlFor= checkBoxId;
    listCont.appendChild(lableEl);
    

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    if(todo.isChecked===true)
    {
        titleEl.classList.add("checked");
    }
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
    let date = new Date();

    let uniqueId = Math.ceil(Math.random() * date.getTime());
// console.log(uniqueId);

    let newTodo = {
    title : inputId.value,
    id : uniqueId,
    isChecked: false
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

function onSavetodo()
{
    let stringyfyTodo = JSON.stringify(todoList);
    localStorage.setItem("myTodoList",stringyfyTodo);
}