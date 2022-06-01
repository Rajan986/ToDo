const taskStatus = document.querySelectorAll('.task__status');
const container = document.getElementById('tasks');
const taskNameInput = document.getElementById('new-task-name');
const taskInput = document.getElementById('new-task-input');
const taskSubmit = document.getElementById('new-task-submit');
const updateTask = document.querySelector('.task-submit__update');
const newTaskName = document.querySelector('.new-task__name');
const newTaskInput = document.querySelector('.new-task__input');
const taskForm = document.getElementById('new-task-form');
const allTasks = document.getElementById('all_tasks');
const markDone = document.querySelectorAll('.done');

const taskStatusArr = Array.from(taskStatus);
const markDoneArr = Array.from(markDone);

const getTaskIdAndUpdateData = (taskId, updateData) => {
  console.log(taskId);
  console.log(updateData);
};

document.addEventListener('click', function (e) {
  if (e.target && e.target.id == 'done_button') {
    console.log('hello from ajax');
    const { id } = e.target.dataset;
    document.getElementById(id).style.textDecoration = 'line-through';
    markTaskComplete({ completed: true }, id);
  }
});

const addTask = async (inputData) => {
  const url = `http://localhost:3000/api/vr1/tasks`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await response.json();
    console.log(data);

    const html = `
      <div class="task">
        <div class="content">
          <p id=${data._id}>${data.name}: ${data.shortDescription}</p>
        </div>
        <div class="actions">
          <a class="edit" href='/edit-task/${data._id}' data-taskId=${data._id}>Edit</a>
          <a class="done" data-Id=${data._id} id='done_button'>Done</a>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.log(err);
  }
};

const getAllTasks = async () => {
  const url = `http://localhost:3000/api/vr1/tasks`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'same-origin',
    });

    const { data } = await response.json();
    console.log(data);

    container.innerHTML = '';
    data.map((element) => {
      //   return container.insertAdjacentHTML(
      container.insertAdjacentHTML(
        'beforeend',
        `
          <div class="task">
            <div class="content">
              <p id=${element._id}>${element.name}: ${element.shortDescription}</p>
            </div>
            <div class="actions">
              <a class="edit"  href='/edit-task/${element._id}' data-taskId=${element._id}>Edit</a>
              <a class="done" data-Id=${element._id} id='done_button'>Done</a>
            </div>
          </div>
        `
      );
    });
  } catch (err) {}
};

const taskCompletion = async (status) => {
  const url = `http://localhost:3000/api/vr1/tasks/completed/${status}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'same-origin',
    });

    const { data } = await response.json();
    // console.log(data);

    container.innerHTML = '';
    data.map((element) => {
      //   return container.insertAdjacentHTML(
      container.insertAdjacentHTML(
        'beforeend',
        `
          <div class="task">
            <div class="content">
              <p id=${element._id}>${element.name}: ${element.shortDescription}</p>
            </div>
            <div class="actions">
              <a class="edit"  href='/edit-task/${element._id}' data-taskId=${element._id}>Edit</a>
              <a class="done" data-Id=${element._id} id='done_button'>Done</a>
            </div>
          </div>
        `
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const markTaskComplete = async (data, id) => {
  const url = `http://localhost:3000/api/vr1/tasks/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'same-origin',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTaskHandler = async (taskId, data) => {
  const updateData = { ...data };
  console.log(updateData);
  const url = `http://localhost:3000/api/vr1/tasks/${taskId}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      mode: 'same-origin',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    window.setTimeout(() => {
      location.assign('/');
    });
  } catch (err) {
    console.log(err);
  }
};

taskStatusArr.forEach((el) => {
  el.addEventListener('click', async (e) => {
    console.log('hello from handler');
    e.preventDefault();
    const status = e.target.dataset.complete;
    await taskCompletion(status);
  });
});

// const taskDetails = document.getElementById(`${taskid}`).textContent;

if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = taskNameInput.value;
    const shortDescription = taskInput.value;

    taskNameInput.value = '';
    taskInput.value = '';
    taskNameInput.focus();
    addTask({ name, shortDescription });
  });
}

if (updateTask) {
  updateTask.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hello from update task');
    const taskId = window.location.href.split('/')[4];

    const name = newTaskName.value;
    const shortDescription = newTaskInput.value;
    updateTaskHandler(taskId, { name, shortDescription });
  });
}

markDoneArr.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const { id } = e.target.dataset;
    document.getElementById(id).style.textDecoration = 'line-through';
    markTaskComplete({ completed: true }, id);
  });
});

allTasks.addEventListener('click', (e) => {
  e.preventDefault();
  getAllTasks();
});
