const inputBox = document.getElementById("inputbox");
const date = document.getElementById("inputdate");
const select = document.getElementById("selection");
const listContainer = document.getElementById("list-container");
const todoCount = document.getElementById("todoCount");
const taskAvailable = document.querySelector(".taskAvailable");
const taskNotAvailable = document.querySelector(".taskNotAvailable");
const completedCount = document.getElementById("completedCount");
const startCount = document.getElementById("startedCount");

let toCount = 0;
let started = 0;
let completed = 0;
let highCount = 0;
let lowCount = 0;
let mediumCount = 0;

let all = [];
let high = [];
let low = [];
let medium = [];

function addTask(){
    if(inputBox.value === ''){
        alert("Enter Some Task to Add");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value +"&emsp;&emsp;&emsp;&emsp;"+ date.value + "&emsp;&emsp;&emsp;&emsp;" + select.value +"&emsp;&emsp;&emsp;&emsp;";
        let statusSelect = document.createElement("select");
        statusSelect.innerHTML = `<option value="todo">To-do</option>
                                  <option value="inprogress">In Progress</option>
                                  <option value="done">Done</option>`;
        statusSelect.addEventListener("change", function () {
            updateStatus(this);
        });
        li.appendChild(statusSelect);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        toCount = toCount+1;
        todoCount.innerHTML = toCount;
        if(toCount > 0){
            taskNotAvailable.style.display = "none";
        }
        else{
            taskAvailable.style.display = "none";
        }
        all.push(li);
        if(select.value == "high"){
            high.push(li);
        }else if(select.value == "medium"){
            medium.push(li);
        }else{
            low.push(li);
        }

    }
    inputBox.value = "";
}

function updateStatus(selectElement) {
    const selectedStatus = selectElement.value;
    const listItem = selectElement.parentElement;
    listItem.className = selectedStatus;
    if(selectedStatus == "inprogress"){
        started = started+1;
        startCount.innerHTML = started;
    }
    else if(selectedStatus == "done"){
        completed = completed+1;
        completedCount.innerHTML = completed;
    }
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        toCount = toCount-1;
        todoCount.innerHTML = toCount;
        if(toCount == 0){
            taskNotAvailable.style.display = "block";
        }
        else{
            taskAvailable.style.display = "none";
        }
    }
}, false);

function filterTasks() {
    currentFilterStatus = document.getElementById("filterStatus").value;
    currentFilterPriority = document.getElementById("filterPriority").value;

    const allTasks = document.querySelectorAll("#list-container li");

    allTasks.forEach(task => {
        const status = task.classList.contains(currentFilterStatus) || currentFilterStatus === "all";
        const priority = task.classList.contains(currentFilterPriority) || currentFilterPriority === "all";

        if (status && priority) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

document.getElementById("filterStatus").addEventListener("change", filterTasks);
document.getElementById("filterPriority").addEventListener("change", filterTasks);

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "I" && e.target.classList.contains("fa-x")) {
        removeTask(e.target);
    }
});


