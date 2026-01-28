import { getTasks } from "./storage.js";
import { toggleTask, deleteTask } from "./tasks.js";

const list = document.getElementById("taskList");

export async function renderTasks() {
  list.innerHTML = "";

  const tasks = await getTasks();

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = async () => {
      await toggleTask(task.id);
      renderTasks();
    };

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = async e => {
      e.stopPropagation();
      await deleteTask(task.id);
      renderTasks();
    };

    li.append(span, btn);
    list.appendChild(li);
  });
}