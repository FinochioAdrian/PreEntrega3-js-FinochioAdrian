import {precargarObjetos} from "./productos.js"
import { guardarStorage, recuperarStorage } from "./storage.js"
export default function tienda (){

  //selectores del DOM
  const listProductos = document.querySelector("#listProductos")
  const botonCart = document.querySelector(".container-cart")
  const cartNumber = document.querySelector(".cart-number")
  const modalCarrito = document.querySelector(".modal-carrito")
  //Constantes
  const productos = [];
  const carrito =[]
  
  
  // renderiza los productos en la página
  function renderizarProductos (productos) {
      let template = ""
      productos.forEach(({id, name, price, details, stock, category, image}) => {
          template += ` <div class="card producto" >
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${details}</p>
            <p class="card-text">${category}</p>
            <p class="card-text">cantidad restante: ${stock}</p>
            <p class="card-text">Precio <span>$${price}</span></p>
            <a href="#" id="${id}-product" class="btn btn-primary btn-añadirProducto">Añadir al Carrito</a>
          </div>
        </div>`
  
      })
      listProductos.innerHTML=template;
  }
  
  //precargar los producto, busca la existencia de productos en el storage si no hay los crea desde una clase
  document.addEventListener("DOMContentLoaded",()=>{
    cargarProductos()
    cargarCarrito()
  })
  
  // Objetivo, cargar los productos, (buscar en el storage || crearlos de una funcion constructora) y llamar al renderizado 
  function cargarProductos (){
    const productosSinParsear = recuperarStorage("productos") || []
      const productosParseados = productosSinParsear.length>0 && JSON.parse(productosSinParsear)|| productosSinParsear
      productosParseados.length > 0
      ? productos.push(...productosParseados)
      : (precargarObjetos(productos), guardarStorage("productos",productos));   
      renderizarProductos(productos)
  }
  function cargarCarrito(){
   
      const carritoSinParsear = localStorage.getItem("carrito") || [];
      const carritoParseado = carritoSinParsear.length>0 && JSON.parse(carritoSinParsear)||carritoSinParsear;
      carritoParseado.length > 0
        && carrito.push(...carritoParseado)
       
      renderizarCarrito();
   
  }
  //mostrar modal de carrito 
  
  botonCart.addEventListener("click",()=>{
    modalCarrito.classList.toggle("show")
  })
  //escucha el btnagregar en el carrito,y btnEliminar del carrito
  document.addEventListener("click" , (e)=>{
    const btnAgregar = document.querySelectorAll(".btn-añadirProducto");
    const btnEliminar = document.querySelectorAll(".btn-borrar-producto");
    btnAgregar.forEach((btn) => {
      if (e.target == btn) {
        const id = parseInt(e.target.id);
        const producto = productos.find((producto) => producto.id === id);
        agregarAlCarrito(producto);
      }
    });
    btnEliminar.forEach((btnBorrar) => {
      if (e.target == btnBorrar) {
        const id = parseInt(e.target.id);
        const indiceProductoAEliminar = carrito
          .map((producto) => producto.id)
          .indexOf(id);
        eliminarDelCarrito(indiceProductoAEliminar);
      }
    });
  })
  
  // function agregarAlCarrito
  function agregarAlCarrito(producto) {
    //Funciona como un actualizar carrito
    const productoBusqueda = carrito.find(
      (productoCarrito) => productoCarrito.id === producto.id
    );
    if (productoBusqueda) {
      productoBusqueda.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarStorage("carrito",carrito)
    renderizarCarrito();
  }
  
  
  //dibuja los productos del carrito en el contenedor
  function renderizarCarrito() {
    modalCarrito.innerHTML = '<div class="carrito-listadoProductos">';
    carrito.length > 0
      ? (carrito.forEach(({ id, name, price, cantidad, image }) => {
        modalCarrito.innerHTML += `<div class="card mb-3" >
          <div class="row g-0 align-items-center">
            <div class="col-3">
              <img src="${image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-7">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><span class="cart-price ">$${price}</span> X <span class="cart-cantidad">${cantidad}</span> Total <span class="cart-priceTotal">$${price*cantidad}</span></p>
                
              </div>
            </div>
            <div class="col-2">
              <i class="bi bi-trash-fill btn-borrar-producto" id="${id}-borrar"></i>
            </div>
          </div>
        </div>`;
        }),modalCarrito.innerHTML +=`</div>
        <div
          class="container__btn-verCarro d-flex justify-content-center align-items-center"
        >
          <a href="./cart.html" type="button" value="" class="btn btn-warning fw-bolder" >Ver Carro</a>
        </div>` )
      : modalCarrito.innerHTML += `
      <div class="carrito-listadoProductos">
        <div class="card mb-3">
          <div class="row g-0 align-items-center ">
            <div class="card-body text-center">
              <h5 class="card-title">No hay Productos en el carrito</h5>
            </div>
          </div>
        </div>
      </div>
    `;
      renderizarCartNumber()
  }
  
  //actualizar cantidad de diferentes productos en el carrito cart-number
  function renderizarCartNumber(){
    cartNumber.innerHTML=carrito.reduce((acc, producto) => acc + producto.cantidad , 0);
  }
  
  //Elimina elementos del carrito
  function eliminarDelCarrito(id) {
    const producto = carrito[id];
    if (producto.cantidad > 1) {
      producto.cantidad--;
    } else {
      carrito.splice(id, 1);
    }
    guardarStorage("carrito",carrito)
    renderizarCarrito();
  }
}
