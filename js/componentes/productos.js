export class Producto {
    constructor(id, name, price, details, stock, category, image) {
      this.id = id;
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
      new Producto(1, "Adidas Esport", 1000, "Talle 43", 10, "Calzado"),
      new Producto(2, "Salomon Esport", 1000, "Talle 43", 10, "Calzado"),
      new Producto(3, "Futsal Esport", 1000, "Talle 43", 10, "Calzado"),
      new Producto(4, "Garyn Esport", 1500, "Talle 43", 10, "Calzado"),
    ];
  
    Nuevosproductos.forEach((ele) => {
      addObjeto(coleccion, ele);
    });
  }