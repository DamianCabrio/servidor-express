const fs = require("fs");

class Contenedor {
  constructor(path) {
    this.path = path;
  }

  async save(product) {
    try {
      const products = await this.getAll();
      const idProducto =
        products.length > 0 ? products[products.length - 1].id + 1 : 1;
      product.setId(idProducto);
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return idProducto;
    } catch (error) {
      console.log("Error al guardar el producto:", error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.log("Error al obtener el producto:", error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      console.log("Error al botener los productos: ", error);
    }
  }

  async getRandom() {
    try {
      const products = await this.getAll();
      const randomIndex = Math.floor(Math.random() * products.length);
      return products[randomIndex];
    } catch (error) {
      console.log("Error al obtener un producto aleatorio: ", error);
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const productsFiltered = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsFiltered, null, 2)
      );
    } catch (error) {
      console.log("Error al borrar el producto: ", error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");
    } catch (error) {
      console.log("Error al borrar los productos: ", error);
    }
  }
}

module.exports = Contenedor;
