// importacion de express
import express from 'express'
import 'dotenv/config'; // configuración de dotenv

// // importaciones personalizadas 
import routes from './Routes/routes';
import { handleErrorMiddleware } from './Middlewares/HandleErrosMiddleware';

// Inicializacion de express
const API_APP = express();

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
API_APP.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
API_APP.use(express.json()); // Entender datos en Formato JSON

// Rutas de la API
API_APP.use('/', routes);

// Medio para manejar los errores 
API_APP.use(handleErrorMiddleware);

// Toma de las variables del archivo env (desestructuracion)
const { PORT_SERVER, URL } = process.env;

// Implementacion desarrollo de dotenv para saber que hacer
const PORT = PORT_SERVER || 3002;
const URL_API = URL || 'localhost';

// Puesta en marcha del server 
API_APP.listen(PORT, () => {
    console.log(`Escuchando en http://${URL_API}:${PORT}/`);
});