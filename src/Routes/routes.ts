// RUTEO PARA ACCESO DE LAS RUTAS DE LA API
import express from 'express';
const Router = express.Router();

// Importaciones propias
import StatusServer from './Status_Server'; // Saber el estado del server 
import Productos from './Products_route';
import Usuarios from './User_route';
import ShoppingCart from './Carrito_route';

// Rutas especificas

// Estado del server
Router.use('/status-server', StatusServer);

// Productos
Router.use('/productos', Productos);
Router.use('/carrito', ShoppingCart);
// // Router.use('/proceso-de-compra', );
Router.use('/usuarios', Usuarios);


export default Router;