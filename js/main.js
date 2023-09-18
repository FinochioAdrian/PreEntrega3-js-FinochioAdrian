import cart from "./componentes/cart.js";
import index from "./componentes/index.js";
import tienda from "./componentes/tienda.js";


const pathName = window.location.pathname

switch (pathName) {
    case "/index.html":
        index()
      break;
    case "/tienda.html":
    tienda()
        break;
    case "/cart.html":
    cart()
        break;

    default:
        break;
}