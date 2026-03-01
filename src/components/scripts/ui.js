import { saveLocalStorage } from "./storage.js";

export function toggleCheckbox(evt, { tasks }) {
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
}

export function deleteTask(evt, { tasks }) {
  const deleteBtn = evt.target.closest("[aria-label = Delete]");

  if (!deleteBtn) return;

  const taskElement = deleteBtn.closest(".todo_task_element");
  const taskId = +taskElement.dataset.id;

  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) tasks.splice(index, 1);

  taskElement.remove();
  saveLocalStorage(tasks);
}

export function editTask(evt, { tasks }) {
  const editBtn = evt.target.closest("[aria-label=Edit]");
  const input = document.createElement("input");
  if (!editBtn) return;

  const taskElement = editBtn.closest(".todo_task_element");
  const taskText = taskElement.querySelector(".todo_task_text");
  const taskId = +taskElement.dataset.id;

  input.type = "text";
  input.classList.add("todo_task_text", "input__edit");
  input.value = taskText.textContent;

  taskText.replaceWith(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      taskText.textContent = input.value;
      input.replaceWith(taskText);
      saveEdit(input, taskId, tasks);
    }
  });
}

export function saveEdit(input, taskId, tasks) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.text = input.value;
  }
  saveLocalStorage(tasks);
}
