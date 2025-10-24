// URL de la base en .json

const url_db = "./db.json";

// Inicializo el carrito

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Imprimimos los guantes

function imprimirGuantesHTML(productos) {
  const contenedorGuantes = document.getElementById("guantes-container");

  for (const guante of productos) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
					<img src="${guante.imagen}">
					<h3>${guante.nombre}</h3>
          <h3>$${guante.precio}</h3>
          <input type="number" 
             min="1" 
             step="1" 
             id="cantidad-${guante.id}" 
             placeholder="  Ingrese cantidad">
          <p id="error-${guante.id}" class="error"></p>
					<!-- Aquí generamos un nombre de id dinámico para cada botón
                    Esto lo hacemos para después poder obtenerlo y asignarle un evento -->
					<button id="${guante.nombre}${guante.id}">Comprar</button>
		`;

    contenedorGuantes.appendChild(card);

    // Eventos

    const boton = document.getElementById(`${guante.nombre}${guante.id}`);

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
  const inputCantidad = document.getElementById(`cantidad-${guante.id}`);

  if (isNaN(cantidad) || cantidad < 1) {
    mostrarNotificacion("Debe al menos comprar 1");
    return;
  }

  const guanteEnCarrito = carrito.find((item) => item.nombre === guante.nombre);
  // const stockGuante = guantes.find((item) => item.nombre === guante.nombre);
  let cantidadEnCarrito = 0;
  if (!!guanteEnCarrito) {
    cantidadEnCarrito = guanteEnCarrito.cantidad;
  }

  if (cantidadEnCarrito + cantidad > guante.stock) {
    mostrarNotificacion("Supera el stock disponible");
    return;
  }

  const precioFinal = guante.precio * cantidad;
  // si agrega a uno que ya existe lo busco primero con el find
  const existente = carrito.find((item) => item.nombre === guante.nombre);

  if (existente) {
    existente.cantidad += cantidad;
    existente.subtotal += precioFinal;
    mostrarNotificacion("Se actualizo la cantidad del producto");
  } else {
    carrito.push({
      nombre: guante.nombre,
      cantidad,
      subtotal: precioFinal,
    });
    mostrarNotificacion("Se agrego el producto");
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

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("item-carrito");

    if (item.cantidad == 1) {
      li.innerHTML = `${item.cantidad} par de ${item.nombre} → $${item.subtotal}
      <button class="btn-quitar"  data-index="${index}" title="Eliminar este producto">
      ❌ </button>`;
    } else {
      li.innerHTML = `${item.cantidad} pares de ${item.nombre} → $${item.subtotal}
      <button class="btn-quitar"  data-index="${index}" title="Eliminar este producto">
      ❌ </button>`;
    }

    contenedor.appendChild(li);

    total += item.subtotal;
  });

  totalElemento.textContent = `Total: $${total}`;

  // Evento de quitar producto

  const botonesQuitar = document.querySelectorAll(".btn-quitar");
  botonesQuitar.forEach((btn) => {
    btn.addEventListener("click", function (evento) {
      const index = evento.target.getAttribute("data-index");
      eliminarArticulo(index);
    });
  });
}

const btnVerCarrito = document.getElementById("btnVerCarrito");
const btnBorrarCarrito = document.getElementById("btnBorrarCarrito");
const carritoSection = document.getElementById("carrito-section");
const btnComprar = document.getElementById("btnComprar");

// Botones

// Ver Carrito

btnVerCarrito.addEventListener("click", () => {
  if (carritoSection.style.display === "none") {
    carritoSection.style.display = "block";
    btnVerCarrito.textContent = "Ocultar carrito";
  } else {
    carritoSection.style.display = "none";
    btnVerCarrito.textContent = "Ver carrito";
  }
});

// Borrar Carrito

btnBorrarCarrito.addEventListener("click", () => {
  Swal.fire({
    title: "Esta seguro de eliminar el carrito?",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      imprimirCarritoEnHTML();
    }
  });
});

// Confirmar Carrito

btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "Agregá productos antes de comprar.",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
    return;
  }

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  Swal.fire({
    title: "Confirmar compra",
    text: `El total de tu compra es $${total}. ¿Desea confirmar?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, comprar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Vaciar carrito y storage
      carrito = [];
      guardarCarrito();
      imprimirCarritoEnHTML();

      Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "Tu pedido fue registrado con éxito.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  });
});

function mostrarNotificacion(texto) {
  // Mostramos un mej con el resultado de la operacion
  Toastify({
    text: texto,
    duration: 3000,
    gravity: "bottom",
    position: "center", // `left`, `center` or `right`
    className: "toast",
  }).showToast();
}

// A partir de un id se elimina el producto
function eliminarArticulo(id) {
  Swal.fire({
    title: "¿Esta seguro de eliminar el producto?",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const item = carrito[id];
      carrito.splice(id, 1);
      // Actualizar el carrito
      guardarCarrito();
      imprimirCarritoEnHTML();
      mostrarNotificacion("El articulo fue eliminado con exito");
    }
  });
}

// Inicializar ahora con FETCH a la URL de la base JSON
// 23/10/2025 Lo había puesto con url pero no me funcionó así que le puse el link
// directo y lo tomó

fetch("db.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar la base de guantes");
    }
    return response.json();
  })
  .then((data) => {
    imprimirGuantesHTML(data);
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error);
  });
if (carrito.length > 0) {
  imprimirCarritoEnHTML();
}
