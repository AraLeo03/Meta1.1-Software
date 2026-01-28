const DB_NAME = "tasks-db";
const STORE = "tasks";
const VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = e => {
      const db = e.target.result;
      db.createObjectStore(STORE, { keyPath: "id" });
    };

    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e);
  });
}

export async function getTasks() {
  const db = await openDB();
  return new Promise(resolve => {
  const tx = db.transaction(STORE, "readonly");
  const store = tx.objectStore(STORE);
  const req = store.getAll();
  req.onsuccess = () => resolve(req.result);
  });
}

export async function saveTask(task) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(task);
}

export async function deleteTaskDB(id) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).delete(id);
}