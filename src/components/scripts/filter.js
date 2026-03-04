function filterTasks({ tasksList, tasks }, filterType) {
  const tasksListElements = tasksList.querySelectorAll(".todo_task_element");

  tasksListElements.forEach((el) => {
    const taskId = +el.dataset.id;
    const task = tasks.find((task) => task.id === taskId);

    if (!task) return;

    switch (filterType) {
      case "completed":
        el.style.display = task.status ? "" : "none";
        break;

      case "active":
        el.style.display = !task.status ? "" : "none";
        break;

      case "all":
      default:
        el.style.display = "";
        break;
    }
  });
}

export function getProgress(evt, { tasksList, tasks }) {
  const progressElement = evt.target.closest(".todo_progress_text");

  if (progressElement.classList.contains("todo_progress_text--all")) {
    filterTasks({ tasksList, tasks }, "all");
  } else if (
    progressElement.classList.contains("todo_progress_text--completed")
  ) {
    filterTasks({ tasksList, tasks }, "completed");
  } else if (progressElement.classList.contains("todo_progress_text--active")) {
    filterTasks({ tasksList, tasks }, "active");
  }
}
