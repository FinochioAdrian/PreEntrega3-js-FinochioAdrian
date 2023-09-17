
import {Producto,productos, precargarObjetos} from "./productos.js"

const listProductos = document.querySelector("#listProductos")

// funcion encargada de renderizar los productos en la página
function renderizarProductos (productos) {
    let template = ""
    productos.forEach(({id, name, price, details, stock, category}) => {
        template += ` <div class="card producto" >
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
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

document.addEventListener("DOMContentLoaded",()=>{
    precargarObjetos()
    console.log(productos);
    renderizarProductos(productos)
})