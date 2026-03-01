import "./index.css";
import {
  toggleCheckbox,
  deleteTask,
  editTask,
} from "./components/scripts/ui.js";

import { handleFormSubmit } from "./components/scripts/tasks.js";

import { loadLocalStorage } from "./components/scripts/storage.js";

document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.documentElement.classList.toggle("theme-dark");
  document.documentElement.classList.toggle("theme-light");
});

const app = {
  tasks: [],
  template: document.querySelector(".template"),
  tasksList: document.querySelector(".todo_tasks_list"),
  tasksListElement: document.querySelector(".todo_task_element"),
  form: document.querySelector(".form"),
};

app.tasksList.addEventListener("change", (evt) => toggleCheckbox(evt, app));
app.tasksList.addEventListener("click", (evt) => deleteTask(evt, app));
app.tasksList.addEventListener("click", (evt) => editTask(evt, app));

handleFormSubmit(app);
loadLocalStorage(app);
