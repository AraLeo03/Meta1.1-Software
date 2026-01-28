import { getTasks } from "./storage.js";
import { toggleTask, deleteTask } from "./tasks.js";

const list = document.getElementById("task-list");

export function renderTasks() {
  list.innerHTML = "";

  getTasks().forEach(task => {
    const li = document.createElement("li");

    li.className = task.completed ? "completed" : "";
    li.textContent = task.text;

    li.onclick = () => {
      toggleTask(task.id);
      renderTasks();
    };

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = e => {
      e.stopPropagation();
      deleteTask(task.id);
      renderTasks();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}