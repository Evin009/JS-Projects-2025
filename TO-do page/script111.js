document.addEventListener("DOMContentLoaded", () => {
  // grab all the elements
  const todoInput = document.getElementById("todo-input");
  const submitBtn = document.getElementById("btn-submit");
  const todoList = document.getElementById("todo-list");

  // store the tasks
  let tasks = JSON.parse(localStorage.getItem("tasks_key")) || [];

  tasks.forEach((task) => {
    renderTask2(task);
  });

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // preventing to reload since the btn inside a form

    const taskText = todoInput.value.trim(); // retrieving the input text

    // if input is empty, do nothing
    if (taskText === "") {
      return;
    }

    // create a new task object
    const newTask = {
      id: Date.now(), // unique ID
      text: taskText, // text of task
      completed: false, // is the task completed or not
    };

    tasks.push(newTask); // add task to the list
    saveTasks(); // saving task to local storage

    renderTask2(newTask);

    todoInput.value = ""; // clear the input

    // console.log(tasks); checkkingg
  });

  //rendering task object (text)
  function renderTask2(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = "li-details";
    if (task.completed === true) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed === true) {
      span.classList.add("line-through");
    }

    const trashIcon = document.createElement("i");
    trashIcon.className =
      "fas fa-trash text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200 ease-in-out";
    trashIcon.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(trashIcon);
    todoList.appendChild(li);
  }

  // function renderTask(task) {
  //   // console.log(task.text);
  //   let li = document.createElement("li");
  //   li.setAttribute("data-id", task.id);
  //   li.innerHTML = `
  //   <span>${task.text}</span>
  //   <button>delete</button>
  //   `;

  //   todoList.appendChild(li);
  // }

  // creating fucntion to store the data to localStorage
  function saveTasks() {
    localStorage.setItem("tasks_key", JSON.stringify(tasks));
  }
});
