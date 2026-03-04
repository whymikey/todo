import { saveLocalStorage } from "./storage.js";

export function toggleCheckbox(evt, { tasks, progressCounter }) {
  const checkbox = evt.target;

  if (!checkbox.classList.contains("todo_tasks_checkbox")) return;

  const taskElement = checkbox.closest(".todo_task_element");
  const taskId = +taskElement.dataset.id;

  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.status = checkbox.checked;
  }

  taskElement.classList.toggle(
    "todo_task_element--completed",
    checkbox.checked,
  );

  saveLocalStorage(tasks);
  renderProgressCounter({ tasks, progressCounter });
}

export function deleteTask(evt, { tasks, progressCounter }) {
  const deleteBtn = evt.target.closest("[aria-label = Delete]");

  if (!deleteBtn) return;

  const taskElement = deleteBtn.closest(".todo_task_element");
  const taskId = +taskElement.dataset.id;

  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) tasks.splice(index, 1);

  taskElement.remove();
  saveLocalStorage(tasks);
  renderProgressCounter({ tasks, progressCounter });
}

export function editTask(evt, { tasks }) {
  const editBtn = evt.target.closest("[aria-label=Edit]");
  const input = document.createElement("input");
  if (!editBtn) return;

  const taskElement = editBtn.closest(".todo_task_element");
  if (taskElement.querySelector(".input__edit")) return;
  if (taskElement.classList.contains("todo_task_element--completed")) return;

  const taskText = taskElement.querySelector(".todo_task_text");
  const taskId = +taskElement.dataset.id;

  input.type = "text";
  input.classList.add("todo_task_text", "input__edit");
  input.value = taskText.textContent;

  taskText.replaceWith(input);
  input.focus();

  const finishingEdit = (save) => {
    if (save) taskText.textContent = input.value;
    input.replaceWith(taskText);
    if (save) saveEdit(input, taskId, tasks);
  };

  input.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") finishingEdit(true);
    if (evt.key === "Escape") finishingEdit(false);
  });

  input.addEventListener("blur", () => {
    setTimeout(() => finishingEdit(false), 0);
  });
}

function saveEdit(input, taskId, tasks) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.text = input.value;
  }
  saveLocalStorage(tasks);
}

export function renderProgressCounter({ tasks, progressCounter }) {
  const completedTasks = tasks.filter((task) => task.status === false);
  progressCounter.textContent = `${completedTasks.length} tasks left`;
}
