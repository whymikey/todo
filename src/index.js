import "./index.css";
import {
  toggleCheckbox,
  deleteTask,
  editTask,
} from "./components/scripts/ui.js";

import { handleFormSubmit } from "./components/scripts/tasks.js";

import { loadLocalStorage } from "./components/scripts/storage.js";

import { getProgress } from "./components/scripts/filter.js";

document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.documentElement.classList.toggle("theme-dark");
  document.documentElement.classList.toggle("theme-light");
});

const app = {
  tasks: [],
  template: document.querySelector(".template"),
  tasksList: document.querySelector(".todo_tasks_list"),
  form: document.querySelector(".form"),
};

const progress = document.querySelector(".todo_progress_text_elements");

app.tasksList.addEventListener("change", (evt) => toggleCheckbox(evt, app));
app.tasksList.addEventListener("click", (evt) => deleteTask(evt, app));
app.tasksList.addEventListener("click", (evt) => editTask(evt, app));

handleFormSubmit(app);
loadLocalStorage(app);

progress.addEventListener("click", (evt) => {
  const clickedTab = evt.target.closest(".todo_progress_text");

  if (!clickedTab) return;

  document
    .querySelector(".todo_progress_text--focus")
    ?.classList.remove("todo_progress_text--focus");
  clickedTab.classList.add("todo_progress_text--focus");

  getProgress({ target: clickedTab }, app);
});

