// Array de guantes
const guantes = [
  {
    id: 1,
    nombre: "Title Rojo",
    marca: "Title",
    precio: 50000,
    imagen: "../images/guante-rojo.jpg",
    stock: 1,
  },
  {
    id: 2,
    nombre: "Rulz Gris",
    marca: "Rulz",
    precio: 60000,
    imagen: "../images/guante-gris.jpg",
    stock: 2,
  },
  {
    id: 3,
    nombre: "Title Silver",
    marca: "Title",
    precio: 70000,
    imagen: "../images/guante-platinum.jpg",
    stock: 3,
  },
  {
    id: 4,
    nombre: "Title Gold",
    marca: "Title",
    precio: 145000,
    imagen: "../images/guante-gold.jpg",
    stock: 1,
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function imprimirGuantesHTML(productos) {
  const contenedorGuantes = document.getElementById("guantes-container");

  for (const guante of productos) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
					<img src="${guante.imagen}"
					<h3>${guante.nombre}</h3>
          <h3>${guante.precio}</h3>
          <input type="number" 
             min="1" 
             step="1" 
             id="cantidad-${guante.id}" 
             placeholder="Ingrese cantidad">
          <p id="error-${guante.id}" class="error"></p>
					<!-- Aquí generamos un nombre de id dinámico para cada botón
                    Esto lo hacemos para después poder obtenerlo y asignarle un evento -->
					<button id="${guante.nombre}${guante.id}">Comprar</button>
		`;

    contenedorGuantes.appendChild(card);

    // Eventos
    const boton = document.getElementById(`${guante.nombre}${guante.id}`);
    // boton.addEventListener("click", () => agregarAlCarrito(guante));
    boton.addEventListener("click", () => {
      const cantidad = parseInt(
        document.getElementById(`cantidad-${guante.id}`).value
      );
      agregarAlCarrito(guante, cantidad);
    });
  }
}
// Agregamos al carrito

function agregarAlCarrito(guante, cantidad) {
  const errorElemento = document.getElementById(`error-${guante.id}`);
  const inputCantidad = document.getElementById(`cantidad-${guante.id}`);
  errorElemento.textContent = ""; // esto limpia el error si ya lo tenia

  if (isNaN(cantidad) || cantidad < 1) {
    errorElemento.textContent = "Debe al menos comprar 1";
    return;
  }

  const guanteEnCarrito = carrito.find((item) => item.nombre === guante.nombre);
  // const stockGuante = guantes.find((item) => item.nombre === guante.nombre);
  let cantidadEnCarrito = 0;
  if (!!guanteEnCarrito) {
    cantidadEnCarrito = guanteEnCarrito.cantidad;
  }

  if (cantidadEnCarrito + cantidad > guante.stock) {
    errorElemento.textContent =
      "Debe comprar máximo " + guante.stock + " par/pares";

    return;
  }

  const precioFinal = guante.precio * cantidad;
  // si agrega a uno que ya existe lo busco primero con el find
  const existente = carrito.find((item) => item.nombre === guante.nombre);

  if (existente) {
    existente.cantidad += cantidad;
    existente.subtotal += precioFinal;
  } else {
    carrito.push({
      nombre: guante.nombre,
      cantidad,
      subtotal: precioFinal,
    });
  }

  guardarCarrito();
  imprimirCarritoEnHTML();
  inputCantidad.value = ""; // para limpiar el valor
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function imprimirCarritoEnHTML() {
  const contenedor = document.getElementById("carrito-container");
  const totalElemento = document.getElementById("total");

  contenedor.innerHTML = "";
  let total = 0;

  for (const item of carrito) {
    const li = document.createElement("li");
    if (item.cantidad == 1) {
      li.textContent = `${item.cantidad} par de ${item.nombre} → $${item.subtotal}`;
    } else {
      li.textContent = `${item.cantidad} pares de ${item.nombre} → $${item.subtotal}`;
    }

    contenedor.appendChild(li);

    total += item.subtotal;
  }

  totalElemento.textContent = `Total: $${total}`;
}

const btnVerCarrito = document.getElementById("btnVerCarrito");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const carritoSection = document.getElementById("carrito-section");

btnVerCarrito.addEventListener("click", () => {
  if (carritoSection.style.display === "none") {
    carritoSection.style.display = "block";
    btnVerCarrito.textContent = "Ocultar carrito";
  } else {
    carritoSection.style.display = "none";
    btnVerCarrito.textContent = "Ver carrito";
  }
});

btnBorrarCarrito.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  imprimirCarritoEnHTML();
});

// Inicializar
imprimirGuantesHTML(guantes);
if (carrito.length > 0) {
  imprimirCarritoEnHTML();
}
