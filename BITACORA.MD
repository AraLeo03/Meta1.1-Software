Objetivo
Construir una Lista de Tareas offline usando el asistente de IA para generar los pilares técnicos (Manifest y SW)
Desarrollo
1. Estructura de la app
-Prompt 1: “Podrías proporcionarme la estructura que debe de seguir una app web que sirve como una Lista de tareas?”
-Resultado 1:
/todo-app
│
├── index.html
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── assets/
│   └── icons/
│
└── README.md
-Prompt 2 (elegido): quiero construir una lista de tareas offline con html y javascript, recomiendame como seria la estructura de la app y porque
-Resultado 2 (elegido):
todo-app/
│
├── index.html
├── css/
│ └── styles.css
│
├── js/
│ ├── app.js		 # Punto de entrada
│ ├── storage.js 	 # Guardar / leer tareas
│ ├── ui.js 		 # Manipulación del DOM
│ └── tasks.js 	 # Lógica de tareas
│
└── assets/
Nos quedamos con el segundo prompt puesto que permite una estructura donde cada archivo tiene una responsabilidad única. app.js coordina todo, tasks.js crea, edita y elimina tareas, storage.js ayuda para que las tareas persistan offline y ui actualiza la interfaz. Esto permitiria escalar mas facilmente la app.

2. Creación del manifest
-Prompt 1: “Ayudame a crear un archivo Manifest para una aplicación web de una lista de tareas offline en base a la siguiente estructura:
todo-app/
│
├── index.html
├── css/
│ └── styles.css
│
├── js/
│ ├── app.js		 # Punto de entrada
│ ├── storage.js 	 # Guardar / leer tareas
│ ├── ui.js 		 # Manipulación del DOM
│ └── tasks.js 	 # Lógica de tareas
│
└── assets/”
-Resultado 1:
{
  "name": "Lista de Tareas Offline",
  "short_name": "Tareas",
  "description": "Aplicación web para gestionar tareas que funciona sin conexión a Internet.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "lang": "es",
  "icons": [
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
-Prompt 2 (Elegido): “ayudame a crear el manifest para una lista de tareas offline con html y javascript con la siguiente estructura 
todo-app/ 
│ 
├── index.html 
├── css/ 
│ └── styles.css 
│ 
├── js/ 
│ 
├── app.js # Punto de entrada 
│ 
├── storage.js # Guardar / leer tareas 
│ 
├── ui.js # Manipulación del DOM 
│ 
└── tasks.js # Lógica de tareas 
│ 
└── assets/”
-Resultado 2 (Elegido):
todo-app/
│
├── index.html
├── manifest.json
├── css/
│ └── styles.css
├── js/
│ ├── app.js
│ ├── storage.js
│ ├── ui.js
│ └── tasks.js
└── assets/
{
"name": "Lista de Tareas Offline",
"short_name": "Tareas",
"description": "Aplicación de lista de tareas que funciona sin conexión",
"start_url": "./index.html",
“scope": "./",
"display": "standalone",
"background_color": "#ffffff",
"theme_color": "#4f46e5",
"orientation": "portrait",
"lang": "es",
"icons": [
{
"src": "assets/icon-192.png",
"sizes": "192x192",
"type": "image/png"
},
{
"src": "assets/icon-512.png",
"sizes": "512x512",
"type": "image/png"
}
]
}
Se eligió el segundo porque dentro del resultado explico para que es cada parte del manifest y para qué sirve el manifest.

3. Creación del service worker
-Prompt 1 (elegido): “ayudame a crear el service worker”
-Resultado 1 (elegido): 
todo-app/
│
├── index.html
├── manifest.json
├── service-worker.js
├── css/
│ └── styles.css
├── js/
│ ├── app.js
│ ├── storage.js
│ ├── ui.js
│ └── tasks.js
└── assets/
  ├── icon-192.png
  └── icon-512.png

const CACHE_NAME = "todo-app-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./js/storage.js",
  "./js/ui.js",
  "./js/tasks.js",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Instalación: guardar archivos en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación: limpiar cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: servir desde caché si no hay internet
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
Se eligió este primer prompt debido a lo completo que se observó que estaba, permitiendo poderlo analizar y comprender.

4. Creación de la interfaz
-Prompt 1: “dame un codigo para la interfaz de usuario que tenga el texto de Lista de Tareas, la opcion de agregar tareas, quitarlas, y tacharlas”

-Resultados 1:

*****index.html*****
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Lista de Tareas</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <div class="container">
    <h1>📋 Lista de Tareas</h1>

    <div class="input-group">
      <input type="text" id="taskInput" placeholder="Escribe una tarea">
      <button onclick="addTask()">Agregar</button>
    </div>

    <ul id="taskList"></ul>
  </div>

  <script src="js/app.js"></script>
</body>
</html>

*****css/styles.css*****
body {
  font-family: Arial, sans-serif;
  background: #f0f4f8;
  display: flex;
  justify-content: center;
  padding: 40px;
}

.container {
  background: #ffffff;
  width: 320px;
  padding: 20px;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

.input-group {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

li.completed span {
  text-decoration: line-through;
  color: gray;
}

li button {
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 6px;
}

*****js/app.js*****
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  span.onclick = () => {
    li.classList.toggle("completed");
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}

Se eligió este primer prompt, ya que el código pudo funcionar sin errores. Cumple su función de lista de tareas y permite agregar tanto como eliminar o tachar las tareas que sean necesarias.
