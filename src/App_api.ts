// importacion de express
import express from 'express'
import 'dotenv/config'; // configuración de dotenv
import cors from 'cors';  
// // Medios de interes: https://aws.amazon.com/es/what-is/cross-origin-resource-sharing/#:~:text=CORS%20permite%20que%20el%20navegador,realizar%20cualquier%20transferencia%20de%20datos.
// // https://chanduthedev.medium.com/setting-up-cors-in-nodejs-cc94e135c74f

// // importaciones personalizadas 
import routes from './Routes/routes';
import { handleErrorMiddleware } from './Middlewares/HandleErrosMiddleware';
import path from 'path';
import { checkFileAccessMiddlware } from './Middlewares/Check_files_public';

// Inicializacion de express
const API_APP = express();

// // Middleware de cors
API_APP.use(cors());

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
API_APP.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
API_APP.use(express.json()); // Entender datos en Formato JSON

// Ruta para servir de imagenes
API_APP.use('/uploads', checkFileAccessMiddlware, express.static(path.join(__dirname, '../uploads')));

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