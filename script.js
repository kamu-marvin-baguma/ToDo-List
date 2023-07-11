const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks")
const error = document.getElementById("error");
const countValue = document.querySelector("count-value");

let tasks = localStorage.getItem("");
if (tasks !== null) {
    console.log(tasksArray);
  
    for (let task of tasksArray) {
      let listElement = document.createElement("li");
      listElement.innerHTML = task;
      listItemContainer.appendChild(listElement);
    }
  }


let taskCount = 0;



const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

function addTaskToLocalStorage() {
    let task = newTaskInput.value;
  
    if (task.trim() === "") {
      return; // Do not add empty tasks
    }
  
    let taskArray = [task];
  
    let myRawTodos = localStorage.getItem("to-dos");
  
    if (myRawTodos !== null) {
      let myTodos = JSON.parse(myRawTodos);
      myTodos.push(task);
      localStorage.setItem("to-dos", JSON.stringify(myTodos));
    } else {
      localStorage.setItem("to-dos", JSON.stringify(taskArray));
    }
  }




    const addTask = () => {
        const taskName = newTaskInput.value.trim();
        error.style.display = "none";
        if(!taskName) {
            setTimeout(() => {
                error.style .display = "block";
            }, 200);
            return;
        }


    const task = ` <div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        
        <button class="delete">
        <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
    </div>`;

    addTaskToLocalStorage();

    
    tasksContainer.insertAdjacentHTML('beforeend', task);
    newTaskInput.value = "";

    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });


    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
          let targetElement = e.target;
          if(!(e.target.className === "edit")) {
            targetElement = e.target.parentElement;
          }
          newTaskInput.value = targetElement.previousElementSibling?.innerText;
          targetElement.parentNode.remove();
          taskCount -= 1;
          displayCount(taskCount);
        };
    });
    
         
};  

addBtn.addEventListener('click', addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
}