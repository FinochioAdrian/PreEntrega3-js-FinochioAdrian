import cart from "./pages/cart.js";
import index from "./pages/index.js";
import productos from "./pages/productos.js";
import tienda from "./pages/tienda.js";


const pathName = window.location.pathname
console.log(pathName)
switch (pathName) {
    case "/index.html":
        index()
      break;
    case "/tienda.html":
    tienda()
    console.log("hola que pasa??");
        break;
    case "/cart.html":
    cart()
        break;
    case "/productos.html":
    productos()
        break;

    default:
        break;
}