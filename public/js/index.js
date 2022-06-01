// console.log("hello from js");
// const axios = require("axios");
const taskForm = document.querySelector(".task__form");

const pendingTask = document.querySelectorAll(".task__status");
const pendingTaskArr = Array.from(pendingTask);

const deleteTask = document.querySelectorAll(".delete");
const deleteTaskArr = Array.from(deleteTask);

const task = async (taskData, taskName) => {
  const url = "http://localhost:3000/api/vr1/tasks";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: taskName,
        shortDescription: taskData,
      }),
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    const { name, shortDescription, _id } = data.data;
    console.log(name, shortDescription, _id);
    const container = document.getElementById("tasks");

    const html = `
      <div class="task">
        <div class="content">
          <p>${name}: ${shortDescription}</p>
        </div>
        <div class="actions">
          <button class="edit" data-taskId=${_id}>Edit</button>
          <button class="delete" data-taskId=${_id}>Delete</button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  } catch (err) {
    console.log(err);
  }
};

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskData = document.querySelector("#new-task-input").value;
  const taskName = document.querySelector("#new-task-name").value;
  await task(taskData, taskName);
  document.querySelector("#new-task-input").value = "";
  document.querySelector("#new-task-name").value = "";
});

// const taskStatusHandlerUsingFetch = async (status) => {
//   const url = `http://localhost:3000/api/vr1/tasks/completed/${status}`;
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       mode: "same-origin",
//     });

//     const data = await response.json()
//     console.log(data)
//   } catch (err) {
//     console.log(err);
//   }
// };

const taskStatusHandler = async (e) => {
  e.preventDefault();
  const taskStatus = e.target.dataset.complete;
  const container = document.getElementById("tasks");

  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `http://localhost:3000/api/vr1/tasks/completed/${taskStatus}`,
    true
  );

  xhr.onload = function () {
    const data = JSON.parse(this.responseText);
    console.log(data.data);
    container.innerHTML = "";
    data.data.map((element) => {
      console.log(element);
      return container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="task">
            <div class="content">
              <p>${element.name}: ${element.shortDescription}</p>
            </div>
            <div class="actions">
              <button class="edit" data-taskId=${element._id}>Edit</button>
              <button class="delete" data-taskId=${element._id}>Delete</button>
            </div>
          </div>
        `
      );
    });
  };

  xhr.send();
};

const deleteTaskHandler = (e) => {
  e.preventDefault();
  console.log("hello from delete handler");
  const element = e.target;
  const taskId = e.target.dataset.taskid;

  const xhr = new XMLHttpRequest();

  xhr.open("DELETE", `http://localhost:3000/api/vr1/tasks/${taskId}`, true);

  xhr.onload = function () {
    if (`${this.status}`.startsWith("2")) {
      console.log("deleted");
      element.remove();
    }
  };

  xhr.send();
};

pendingTaskArr.forEach((el) => {
  el.addEventListener("click", taskStatusHandler);
});

deleteTaskArr.forEach((el) => {
  el.addEventListener("click", deleteTaskHandler);
});

// pendingTask.addEventListener("click", taskStatusHandler);
// const submitHandler = (e) => {
//   e.preventDefault();
//   console.log("hello from event handler");

//   const taskData = document.querySelector("#new-task-input").value;
//   const taskName = document.querySelector("#new-task-name").value;
//   const container = document.getElementById("tasks");

//   console.log(taskData, { taskName });

//   let xhr = new XMLHttpRequest();

//   xhr.open("POST", "http://localhost:3000/api/vr1/tasks", true);
//   xhr.setRequestHeader("Content-type", "application/json");

//   xhr.onload = function () {
//     const { name, shortDescription, _id } = JSON.parse(this.responseText).data;
// const html = `
//   <div class="task">
//     <div class="content">
//       <p>${name}: ${shortDescription}</p>
//     </div>
//     <div class="actions">
//       <button class="edit" data-taskId=${_id}>Edit</button>
//       <button class="delete" data-taskId=${_id}>Delete</button>
//     </div>
//   </div>
// `;

//     if (`${this.status}`.startsWith("2")) {
//       // container.insertAdjacentHTML("beforeend");
//       // console.log(name, shortDescription, _id);
//       container.insertAdjacentHTML("beforeend", html);
//     }
//   };

//   let params = JSON.stringify({ name: taskName, shortDescription: taskData });
//   xhr.send(params);
// };
// taskForm.addEventListener("submit", submitHandler);

// <input class="text" type="text" value=${shortDescription} readonly="">
