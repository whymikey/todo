import { createTaskElement } from "./tasks.js";

export function saveLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadLocalStorage({ tasks, tasksList, template }) {
  const data = localStorage.getItem("tasks");
  if (!data) return;

  const parsedTasks = JSON.parse(data);
  tasks.push(...parsedTasks);

  parsedTasks.forEach((task) => {
    const taskElement = createTaskElement(task, template);
    tasksList.appendChild(taskElement);
  });
}
