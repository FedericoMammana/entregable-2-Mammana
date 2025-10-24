Este proyecto es mi entrega final. 
Se trata de una aplicación web que utiliza HTML, CSS y JavaScript para mostrar productos (o contenido) y gestionar interacciones con el usuario.  
Incorpora la librería **Toastify** y **SweetAlert** para mostrar notificaciones al usuario (mensajes emergentes).

El repositorio incluye también un archivo `db.json` que simula una base de datos local para usar con fetch (o similar) en el frontend.

## 🗂 Estructura del proyecto
/
├─ images/ ← Carpeta con imágenes usadas en la app
├─ db.json ← Mock de datos (JSON)
├─ index.html ← Página principal
├─ index-nue.js ← Lógica JavaScript de la aplicación
└─ styles.css ← Estilos CSS

## 🛠 Tecnologías usadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Toastify (para notificaciones tipo “toast”)  
- JSON local como fuente de datos (`db.json`)

---

## 🚀 Cómo correr el proyecto en local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/FedericoMammana/entregable-2-Mammana.git
2.
   Entra al directorio:

cd entregable-2-Mammana

3.
Abre index.html directamente en tu navegador (o usa un servidor local como Live Server de VSCode para evitar problemas de CORS al consumir db.json).

Interactúa con la aplicación: se mostrarán productos desde db.json y cuando se realicen acciones se desplegarán notificaciones con Toastify y SweetAlert.
