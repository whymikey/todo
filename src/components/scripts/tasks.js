import { saveLocalStorage } from "./storage.js";

export function addTask(text, { tasks }) {
  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text: text,
    status: false,
  };
  tasks.push(task);
  saveLocalStorage(tasks);
  return task;
}

export function createTaskElement(task, template) {
  const clone = template.content.cloneNode(true);
  const taskElement = clone.querySelector(".todo_task_element");
  const taskText = clone.querySelector(".todo_task_text");
  const taskCheckbox = clone.querySelector(".todo_tasks_checkbox");

  taskText.textContent = task.text;
  taskCheckbox.checked = task.status;
  taskElement.dataset.id = task.id;

  if (task.status) {
    taskElement.classList.add("todo_task_element--completed");
  }

  return clone;
}

export function handleFormSubmit({ form, tasksList, tasks, template }) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const input = form.querySelector(".todo_input");

    if (!input.value.trim()) return;

    const taskData = addTask(input.value, { tasks });
    const createdTask = createTaskElement(taskData, template);
    tasksList.appendChild(createdTask);

    input.value = "";
  });
}
