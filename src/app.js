import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/ProductManager.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 8080;

// Configurar Handlebars
app.engine("handlebars", handlebars.engine({
  defaultLayout: false
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Socket.io
const manager = new ProductManager("./src/data/products.json");

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("add-product", async (data) => {
    await manager.addProduct(data);
    const products = await manager.getProducts();
    io.emit("products-update", products);
  });

  socket.on("delete-product", async (data) => {
    await manager.deleteProduct(data.id);
    const products = await manager.getProducts();
    io.emit("products-update", products);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Hacer io disponible globalmente para usarlo en rutas
app.set("io", io);

server.listen(PORT, () => {
  console.log("Servidor escuchando en puerto 8080");
});
