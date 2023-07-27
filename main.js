let inputBox = document.querySelector("input");

let taskContainer = document.querySelector(".tasks");

let editBtn = document.querySelector(".edit");

let delBtn = document.querySelector(".remove");

let clearAll = document.querySelector(".del_all");

let tasks = [];

let i;

let mood = "create";

window.onload = () => {
  let query = matchMedia(`(max-width:376px)`);
  if (query.matches) {
    clearAll.remove();
    taskContainer.before(clearAll);
    clearAll.style.cssText = `display: block;
    width: 100%;
    margin: 15px 0;`;
  }
};

if (localStorage.getItem("tasks_data")) {
  getDataStorage();
}

inputBox.onkeyup = createData;

clearAll.onclick = clearData;

function createData(e) {
  let regex = /\w+(\s+\w+)?/;
  if (e.key === "Enter" && regex.test(inputBox.value)) {
    if (mood === "create") {
      let task = {
        task_name: inputBox.value.trim(),
        work_done: false
      };
      tasks.push(task);
      setDataStorage();
      readData();
      inputBox.value = "";
      checkLength();
    } else {
      tasks[i].task_name = inputBox.value;
      setDataStorage();
      inputBox.value = "";
      readData();
      mood = "create";
      checkLength();
    }
  }
}

function readData() {
  taskContainer.innerHTML = "";
  let activeSection = document.querySelector("h4.active");
  if (activeSection.textContent === "All") {
    for (let task of tasks) {
      let taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.work_done == true) {
        taskDiv.innerHTML += `
        <div class="title done" onclick=unCompTask(${tasks.indexOf(
          task
        )})><span>${task.task_name}</span></div>
        <div class="right_bottums">
          <button class="edit" onclick=editItem(${tasks.indexOf(
            task
          )})>edit</button>
          <button class="remove" onclick=removeItem(${tasks.indexOf(task)})>
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        `;
      } else {
        taskDiv.innerHTML += `
        <div class="title undone" onclick=compTask(${tasks.indexOf(
          task
        )})><span>${task.task_name}</span></div>
        <div class="right_bottums">
        <button class="edit" onclick=editItem(${tasks.indexOf(
          task
        )})>edit</button>
          <button class="remove" onclick=removeItem(${tasks.indexOf(task)})>
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;
      }
      taskContainer.append(taskDiv);
    }
  } else if (activeSection.textContent === "Pending") {
    for (let task of tasks) {
      let taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.work_done == false) {
        taskDiv.innerHTML += `
        <div class="title undone" onclick=compTask(${tasks.indexOf(
          task
        )})><span>${task.task_name}</span></div>
        <div class="right_bottums">
        <button class="edit" onclick=editItem(${tasks.indexOf(
          task
        )})>edit</button>
          <button class="remove" onclick=removeItem(${tasks.indexOf(task)})>
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      
        `;
      } else {
        continue;
      }
      taskContainer.append(taskDiv);
    }
  } else {
    for (let task of tasks) {
      let taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.work_done == true) {
        taskDiv.innerHTML += `
      <div class="title done" onclick=unCompTask(${tasks.indexOf(
        task
      )})><span>${task.task_name}</span></div>
      <div class="right_bottums">
        <button class="edit" onclick=editItem(${tasks.indexOf(
          task
        )})>edit</button>
        <button class="remove" onclick=removeItem(${tasks.indexOf(task)})>
        <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      `;
      } else {
        continue;
      }
      taskContainer.append(taskDiv);
    }
  }
  checkLength();
}

function getDataStorage() {
  tasks = JSON.parse(localStorage.getItem("tasks_data"));
  readData();
}

function setDataStorage() {
  localStorage.setItem("tasks_data", JSON.stringify(tasks));
}

function removeItem(index) {
  tasks.splice(index, 1);
  setDataStorage();
  readData();
  checkLength();
}

function editItem(index) {
  inputBox.value = tasks[index].task_name;
  i = index;
  mood = "update";
}

function clearData() {
  tasks.splice(0);
  localStorage.clear();
  readData();
  checkLength();
}

function checkLength() {
  if (
    taskContainer.textContent == "" ||
    taskContainer.textContent == "no tasks to show"
  ) {
    let msg = document.createElement("p");
    msg.className = "msg";
    msg.textContent = "no tasks to show";
    msg.style.cssText = `
      text-align: center;
      font-size: 1.25rem;
      color: #ada5a5;
    `;
    taskContainer.innerHTML = "";
    taskContainer.append(msg);
    clearAll.style.opacity = "0.5";
  } else {
    clearAll.style.opacity = "1";
  }
}

function compTask(index) {
  tasks[index].work_done = true;
  setDataStorage();
  readData();
}

function unCompTask(index) {
  tasks[index].work_done = false;
  setDataStorage();
  readData();
}

checkLength();

document.querySelectorAll("h4").forEach((el) => {
  el.onclick = function (e) {
    document.querySelectorAll("h4").forEach((el) => {
      el.classList.remove("active");
    });
    this.classList.add("active");
    readData();
  };
});


