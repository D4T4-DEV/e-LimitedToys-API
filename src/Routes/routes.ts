// RUTEO PARA ACCESO DE LAS RUTAS DE LA API
import express from 'express';
const Router = express.Router();
import cors from 'cors';

// Importaciones propias
import StatusServer from './Status_Server'; // Saber el estado del server 
import Productos from './Products_route';
import Usuarios from './User_route';
import ShoppingCart from './Carrito_route';
import ProcesoCompra from './ProcesoCompra_route';
import Banners from './Banner_route';
import SubirImagenesServer from './SubirImagenesServer';
import { CorsOptions } from 'cors';


const { ALLOWED_ORIGINS, IS_PRODUCTION } = process.env;
// Opciones de CORS
const corsOptionsGeneral: CorsOptions = {
    origin: (origin, callback) => {
        // Permitir cualquier origen en modo de desarrollo
        if (IS_PRODUCTION === "false" || (origin && ALLOWED_ORIGINS?.includes(origin))) {
            callback(null, true);
        } else {
            callback(new Error(`Acceso denegado de uso dado el origen ${origin}`));
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
};

const CORS = cors(corsOptionsGeneral);

// Rutas especificas

// Estado del server
Router.use('/status-server', CORS, StatusServer);
Router.use('/subir-img', CORS, SubirImagenesServer);
    
// Productos
Router.use('/productos', CORS, Productos);
Router.use('/banner', CORS, Banners);
Router.use('/carrito', CORS, ShoppingCart);
Router.use('/proceso-de-compra', CORS, ProcesoCompra);
Router.use('/usuarios', CORS, Usuarios);


export default Router;