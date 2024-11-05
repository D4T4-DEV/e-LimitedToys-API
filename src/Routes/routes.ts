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

// Rutas especificas

// Estado del server
Router.use('/status-server', cors(corsOptionsGeneral), StatusServer);
Router.use('/subir-img', cors(corsOptionsGeneral), SubirImagenesServer);

// Productos
Router.use('/productos', cors(corsOptionsGeneral), Productos);
Router.use('/banner', cors(corsOptionsGeneral), Banners);
Router.use('/carrito', cors(corsOptionsGeneral), ShoppingCart);
Router.use('/proceso-de-compra', cors(corsOptionsGeneral), ProcesoCompra);
Router.use('/usuarios', cors(corsOptionsGeneral), Usuarios);


export default Router;