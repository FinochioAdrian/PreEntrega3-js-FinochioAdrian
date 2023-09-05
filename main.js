class Producto {
  constructor(id, name, price, details, stock, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.details = details;
    this.stock = stock;
    this.category = category;
  }

  disminuirStock(newStock) {
    const newDate = new Date();

    this.stock -= newStock;
    this.modifyAt = newDate.toLocaleString();
  }
  aumetarStock(newStock) {
    const newDate = new Date();
    this.stock += newStock;
    this.modifyAt = newDate.toLocaleString();
  }
}
const productos = [];

function init() {
  let exit = false;

  do {
    const userResponse = Number(
      prompt(`Sistema Administracion De Comercio
        1. Administración de Productos,
        2. Funcionalidades no implemetadas (En desarrollo entrega Final)
        4. Salir`)
    );

    console.log(userResponse);

    switch (userResponse) {
      case 1:
        administracionProductos();
        break;
      case 2:
        proximasEntregas();
        break;

      case 4:
        exit = true;
        break;
    }
  } while (!exit);
}

init();

function proximasEntregas() {
  alert(`Funcionalidades para la proxima Entrega
   2. Administración de Empleados,
   3. Registrar Venta`);
}
function administracionProductos() {
  let exit = false;
  do {
    const userResponse = Number(
      prompt(`Administración de Productos:
        1. Añadir Nuevos Productos,
        2. Mostrar todos los productos por consola
        3. Eliminar Producto,
        4. Modificar Producto,
        5. Buscar producto por... ,
        6. Salir ,
        9. precargar Objetos`)
    );
    switch (userResponse) {
      case 1:
        addProducts();

        break;
      case 2:
        viewAllobjs(productos);
        break;
      case 3:
        deleteObj(productos);
        break;
      case 4:
        modifyObj(productos);
        break;
      case 5:
        searchBy(productos);
        break;
      case 6:
        exit = true;
        break;
      case 9:
        precargarObjetos();
        break;
    }
  } while (!exit);
}
function searchBy(collection) {
  if (collection.length > 0) {
    const keys = collectionPropKeys(collection[0]);
    
    const template = newTemplateArr(keys);
    const keyBuscada=promptAdd(`Buscar Productos por:\n ${template} `,"integer")-1;
    const propbuscada = promptAdd(`Ingrese la palabra clave o el valor a buscar`)
    if (keys.length>=keyBuscada && !isNaN(keyBuscada) ){
      const resultados = viewObjsBy(collection, keys[keyBuscada], propbuscada)
      console.table(resultados)
    }
  } else {
    alert("No hay elementos para buscar");
  }
}
function viewAllCategory(collection) {
  const category = Array.from(
    new Set(
      collection.map((value) => {
        return value.category;
      })
    )
  );
  return category;
}

function addProducts() {
  let salir = false;
  do {
    const id = parseInt(promptAdd("Ingrese un id"));
    const name = promptAdd("Ingrese un Nombre");
    const price = Number(promptAdd("Ingrese un Precio"));
    const details = promptAdd("Ingrese los Detalles");
    const stock = parseInt(promptAdd("Ingrese el stock inicial"));
    const category = promptAdd(
      `Ingrese una categoria ${viewAllCategory(productos)}`
    );
    addObjeto(
      productos,
      new Producto(id, name, price, details, stock, category)
    );
    salir = true;
  } while (!salir);
}

function addObjeto(collection, obj) {
  collection.push(obj);
}

function viewAllobjs(collection) {
  console.table(collection);
}

function promptAdd(mensaje,tipoEsperado="string") {
  let salir = false;
  let respuesta;
  do {
    respuesta = prompt(`${mensaje}`);
    switch (tipoEsperado) {
      case "string":

        break; 
      case "integer":
        respuesta=parseInt(respuesta)
        tipoEsperado="number"
        break;
      case "number":
        respuesta=Number(respuesta)
        break;
      case "float":
        respuesta=parseFloat(respuesta)
        tipoEsperado="number"
        break;
      
      default:
        return
    }
    if (respuesta && typeof respuesta == tipoEsperado) {
      salir = true;
    }
  } while (!salir);
  return respuesta;
}

function deleteObj(collection) {
  const id = parseInt(promptAdd(`Ingrese el id del Elemento a Eliminar`));
  const objFilter = viewObjById(collection, id);
  let objSelected;

  if (objFilter.length > 0) {
    if (objFilter.length > 1) {
      let templete = newTemplate(objFilter);
      objSelected =
        objFilter[
          parseInt(
            promptAdd(`Seleccione un Elemento de la lista\n ${templete}`)
          ) - 1
        ];
    } else {
      objSelected = objFilter[0];
    }

    let template = newTemplateObj(objSelected);

    if (confirm(`Confirma la Eliminación del Elemento ${template}`)) {
      let indice = collection.findIndex((obj) => obj === objSelected);
      collection.splice(indice, 1);
    } else {
      alert("No se elimino el Elemento con ese Id");
    }
  } else {
    alert("No Existe Elemento con ese Id");
  }
}

function viewObjById(collection, id) {
  const resultados = collection.filter((obj) => obj.id === id);
  return resultados;
}
function viewObjsBy(collection, key, prop) {
  const resultados = collection.filter((obj) => obj[key] == prop);
  return resultados;
}

function modifyObj(collection) {
  const id = parseInt(promptAdd(`Ingrese el id del Elemento a modificar`));
  const objFilter = viewObjById(collection, id);
  let objSelected;

  if (objFilter.length > 0) {
    if (objFilter.length > 1) {
      let templete = newTemplate(objFilter);
      objSelected =
        objFilter[
          parseInt(
            promptAdd(`Seleccione un Elemento de la lista\n ${templete}`)
          ) - 1
        ];
    } else {
      objSelected = objFilter[0];
    }

    let template = newTemplateObj(objSelected);

    let indice = collection.findIndex((obj) => obj === objSelected);
    console.log("objeto a modificar", collection[indice]);
    collection[indice];
    for (const key in collection[indice]) {
      if (Object.hasOwnProperty.call(collection[indice], key)) {
        if (typeof collection[indice][key] == "number") {
          collection[indice][key] = Number(
            promptAdd(`Ingrese un ${key}: (${collection[indice][key]})`)
          );
        } else {
          collection[indice][key] = promptAdd(
            `Ingrese un ${key}: (${collection[indice][key]})`
          );
        }
      }
    }

    /* collection.splice(indice, 1); */
  } else {
    alert("No Existe Elemento con ese Id");
  }
}

function precargarObjetos() {
  const Nuevosproductos = [
    new Producto(1, "Adidas Esport", 1000, "Talle 43", 10, "Calzado"),
    new Producto(2, "Salomon Esport", 1000, "Talle 43", 10, "Calzado"),
    new Producto(3, "Futsal Esport", 1000, "Talle 43", 10, "Calzado"),
    new Producto(1, "Garyn Esport", 1500, "Talle 43", 10, "Calzado"),
  ];

  Nuevosproductos.forEach((ele) => {
    addObjeto(productos, ele);
  });
}

function collectionPropKeys(obj) {
  return Object.keys(obj);
}

function newTemplate(collection) {
  return collection
    .map((obj, index) => {
      let templete = "";
      for (const prop in obj) {
        templete += `${prop} = ${obj[prop]} `;
      }
      return `${index + 1}. ${templete}`;
    })
    .join(" \n ");
}
function newTemplateObj(obj) {
  let templete = "";
  for (const prop in obj) {
    templete += `${prop} = ${obj[prop]} `;
  }

  return templete;
}
function newTemplateArr(arr) {
  return arr
    .map((ele, index) => {
      return `${index + 1}. ${ele}`;
    })
    .join(" \n ");1

}
