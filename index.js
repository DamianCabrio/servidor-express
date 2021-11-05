const express = require("express");
const app = express();

const Contenedor = require("./classes/Contenedor");

const productContainer = new Contenedor("./data/products.txt");

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));



app.get("/", (_, res) => {
  res.send(`<h1 style='color: blue'>Bienvenidos al desafío de servidor node/express</h1>
  <p>Para ver todos los productos disponibles en el servidor haz clic <a href='/productos'>aquí</a></p>
  <p>Para ver un producto al azar haz clic <a href='/productoRandom'>aquí</a></p>
  <small>Damián Andrés Cabrio - Coderhouse 2021<small>
  `);
});

app.get("/productos", (_, res) => {
  productContainer.getAll().then((products) => {
    res.send(products);
  });
});

app.get("/productoRandom", (_, res) => {
  productContainer.getRandom().then((product) => {
    res.send(product);
  });
});