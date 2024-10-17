// RUTEO PARA ACCESO DE LAS RUTAS DE LA API
import express from 'express';
const Router = express.Router();

// Importaciones propias
import StatusServer from './Status_Server'; // Saber el estado del server 
import Productos from './Products_route';
// import ShoppingCart from './';

// Rutas especificas

// Estado del server
Router.use('/status-server', StatusServer);

// Productos
Router.use('/productos', Productos);
// Router.use('/carrito-de-compras', );
// // Router.use('/proceso-de-compra', );
// Router.use('/usuarios', );


export default Router;