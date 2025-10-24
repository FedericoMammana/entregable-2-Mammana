# 🥊 Entregable 2 – Federico Mammana

## 📖 Descripción

Este proyecto corresponde al **Entregable Nº 2** de Federico Mammana.  
Se trata de una **aplicación web desarrollada con HTML, CSS y JavaScript**, que muestra productos y permite interactuar con ellos mediante notificaciones.  
Utiliza la librería **Toastify** para desplegar mensajes emergentes al usuario de forma visual y dinámica.  
También incluye un archivo `db.json` que funciona como una **fuente de datos simulada** (mock).

---

## 🗂 Estructura del proyecto

```bash
/
├─ images/                ← Carpeta con imágenes usadas en la app  
├─ db.json                ← Mock de datos (JSON)  
├─ index.html             ← Página principal  
├─ index-nue.js           ← Lógica JavaScript de la aplicación  
└─ styles.css             ← Estilos CSS  


---
```

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
2. Ingresar al directorio del proyecto:
    ```bash
   cd entregable-2-Mammana
3. Abrir el archivo index.html en tu navegador.
   👉 Si usás fetch() para leer el db.json, te conviene usar un servidor local como Live Server de VSCode para evitar errores de CORS.

4. Probar la aplicación:

   Visualizá los productos cargados desde db.json.

   Realizá acciones (por ejemplo, agregar al carrito) y verificá que aparezcan las notificaciones con Toastify y SweetAlert.

## ✅ Qué verificar

Los datos del db.json se cargan correctamente.

Las notificaciones aparecen según las acciones del usuario.

El diseño se adapta bien en distintas resoluciones (responsive).

Las clases personalizadas de Toastify aplican correctamente.
   
