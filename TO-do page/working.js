const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const btnSubmit = document.getElementById("btn-submit");

let tasks = [];

function addItem(item) {
  tasks.push(item);
  saveItem();
  renderItem(item);
}

function saveItem() {
  localStorage.setItem("task_key", JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveItem();
  renderList(); // Re-render everything
}

function renderItem(task) {
  let li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.className = "li-details";

  const taskText = document.createElement("span");
  taskText.textContent = task.text;
  if (task.completed) {
    taskText.classList.add("line-through");
  }

  const trash = document.createElement("i");
  trash.className =
    "fas fa-trash text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200 ease-in-out";
  trash.addEventListener("click", () => deleteTask(task.id));

  li.appendChild(taskText);
  li.appendChild(trash);
  todoList.appendChild(li);
}

function renderList() {
  todoList.innerHTML = "";
  tasks.forEach(renderItem);
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const inputText = todoInput.value.trim();
  if (!inputText) return;

  const newItem = {
    text: inputText,
    completed: false,
    id: Date.now(),
  };

  addItem(newItem);
  todoInput.value = "";
});

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("task_key");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderList();
  }
});
