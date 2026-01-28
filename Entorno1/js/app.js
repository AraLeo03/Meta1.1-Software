import { addTask } from "./tasks.js";
import { renderTasks } from "./ui.js";

const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");

btn.addEventListener("click", async () => {
  if (!input.value.trim()) return;
  await addTask(input.value);
  input.value = "";
  renderTasks();
});

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}

renderTasks();