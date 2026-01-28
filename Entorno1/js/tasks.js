import { getTasks, saveTask, deleteTaskDB } from "./storage.js";

export async function addTask(text) {
  await saveTask({
    id: Date.now(),
    text,
    completed: false
  });
}

export async function toggleTask(id) {
  const tasks = await getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    await saveTask(task);
  }
}

export async function deleteTask(id) {
  await deleteTaskDB(id);
}