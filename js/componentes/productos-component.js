export class Producto {
    constructor( name, price, details, stock, category,id, image) {
      this.id = id||Date.now();
      this.name = name;
      this.price = price;
      this.details = details;
      this.image = image || "https://via.placeholder.com/150"
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




export function addObjeto(collection, obj) {
    collection.push(obj);
  }

export function precargarObjetos(coleccion) {
    const Nuevosproductos = [
      new Producto( "Adidas Esport", 1000, "Talle 43", 10, "Calzado",1),
      new Producto( "Salomon Esport", 1000, "Talle 43", 10, "Calzado",2),
      new Producto( "Futsal Esport", 1000, "Talle 43", 10, "Calzado",3),
      new Producto( "Garyn Esport", 1500, "Talle 43", 10, "Calzado",4),
    ];
  
    Nuevosproductos.forEach((ele) => {
      addObjeto(coleccion, ele);
    });

    
  }