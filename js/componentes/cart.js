import { precargarObjetos } from "./productos.js";
import { guardarStorage, recuperarStorage } from "./storage.js";

const listCarrito = document.querySelector(".list-carrito__list");

const productos = [];
const carrito = [];
export default function cart() {
  document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    cargarCarrito();
  });
}

// Objetivo, cargar los productos, (buscar en el storage || crearlos de una funcion constructora) y llamar al renderizado
function cargarProductos() {
  const productosSinParsear = recuperarStorage("productos") || [];
  const productosParseados =
    (productosSinParsear.length > 0 && JSON.parse(productosSinParsear)) ||
    productosSinParsear;
  productosParseados.length > 0
    ? productos.push(...productosParseados)
    : (precargarObjetos(productos), guardarStorage("productos", productos));
}

function cargarCarrito() {
  const carritoSinParsear = localStorage.getItem("carrito") || [];
  const carritoParseado =
    (carritoSinParsear.length > 0 && JSON.parse(carritoSinParsear)) ||
    carritoSinParsear;
  carritoParseado.length > 0 && carrito.push(...carritoParseado);

  renderizarListadoCarrito();
}

function renderizarListadoCarrito() {
  listCarrito.innerHTML = "";
  carrito.length > 0
      ?  carrito.forEach(({ id, name, price, cantidad, image, category }) => {
    listCarrito.innerHTML += `<div class="card my-3 col-12">
<div class="row g-0 align-items-center">
  <div class="col-md-4">
    <img src="${image}" class="img-fluid rounded-start" alt="..." />
  </div>
  <div class="col-md-6">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-title fw-bolder">${category}</p>
      <p class="card-text"><span class="cart-price ">$${price}</span> X <span class="cart-cantidad">${cantidad}</span> Total <span class="cart-priceTotal">$${
      price * cantidad
    }</span></p>

      
    </div>
  </div>
  <div class="col-2 text-center">
    <i class="bi bi-trash-fill btn-borrar-producto" id="${id}-borrar"></i>
  </div>
</div>
</div>`;
  }): listCarrito.innerHTML = `
  <div class="row g-0 align-items-center ">
    <div class="card-body text-center">
      <h5 class="card-title">No hay Productos en el carrito</h5>
    </div>
  </div>
`
}

document.addEventListener("click", (e) => {
  const btnEliminar = document.querySelectorAll(".btn-borrar-producto");
  btnEliminar.forEach((btnBorrar) => {
    if (e.target == btnBorrar) {
      const id = parseInt(e.target.id);
      const indiceProductoAEliminar = carrito
        .map((producto) => producto.id)
        .indexOf(id);
      eliminarDelCarrito(indiceProductoAEliminar);
    }
  });
});

function eliminarDelCarrito(id) {
  const producto = carrito[id];
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    carrito.splice(id, 1);
  }
  guardarStorage("carrito", carrito);
  renderizarListadoCarrito();
}
