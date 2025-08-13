// get the elements
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const btnSubmit = document.getElementById("btn-submit");

let tasks = [];

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const inputText = todoInput.value.trim();
  if (inputText === "") return;

  const newTask = {
    text: inputText,
    completed: false,
    id: Date.now(),
  };

  addItem(newTask);
  todoInput.value = "";
});

// add item
function addItem(task) {
  tasks.push(task);
  saveItem();
  renderItem(task);
}

// save item
function saveItem() {
  localStorage.setItem("task_key", JSON.stringify(tasks));
}

// render Item ****
function renderItem(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.className = "li-details";
  if (task.completed === true) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.textContent = task.text;

  const trashIcon = document.createElement("i");
  trashIcon.className =
    "fas fa-trash text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200 ease-in-out";
  trashIcon.addEventListener("click", () => deleteTask(task.id));

  li.addEventListener("click", function (e) {
    if (e.target.tagName === "I") return;
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveItem();
  });

  li.appendChild(span);
  li.appendChild(trashIcon);
  todoList.appendChild(li);
}

// re-redering the entire list again on loading *****
function renderListItems() {
  todoList.innerHTML = ""; // clearing the list for fresh render
  tasks.forEach((item) => renderItem(item));
} // render each task from the list

// delete task ****
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id != id);
  saveItem();
  renderListItems(); // re-render list
}

// Once the page load retrieve and display the content
window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("task_key"); // look for stored data named task_key
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // data stored as string convert it back to JS list
    renderListItems(); // display the content of list
  }
});
