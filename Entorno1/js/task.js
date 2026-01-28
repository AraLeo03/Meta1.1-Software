import { getTasks, saveTasks } from "./storage.js";

export function addTask(text) {
  const tasks = getTasks();
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });
  saveTasks(tasks);
}

export function toggleTask(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks(tasks);
}

export function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}