// importacion de express
import express from 'express'
import 'dotenv/config'; // configuración de dotenv
import cors, { CorsOptions } from 'cors';
// Medios de interes: https://aws.amazon.com/es/what-is/cross-origin-resource-sharing/#:~:text=CORS%20permite%20que%20el%20navegador,realizar%20cualquier%20transferencia%20de%20datos.
// https://chanduthedev.medium.com/setting-up-cors-in-nodejs-cc94e135c74f
// https://expressjs.com/en/resources/middleware/cors.html


// importaciones personalizadas 
import routes from './Routes/routes';
import { handleErrorMiddleware } from './Middlewares/HandleErrosMiddleware';
import path from 'path';
import { checkFileAccessMiddlware } from './Middlewares/Check_files_public';

// Inicializacion de express
const API_APP = express();

// Toma de las variables del archivo env (desestructuracion)
const { PORT_SERVER, URL, DIR_UPLOAD, TYPE_CONN } = process.env;


// Opciones de CORS
const corsOptionsImgs: CorsOptions = {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Authorization'],
    credentials: false
};

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
API_APP.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
API_APP.use(express.json()); // Entender datos en Formato JSON

// Ruta para servir de imagenes
API_APP.use(`/${DIR_UPLOAD}`, cors(corsOptionsImgs), checkFileAccessMiddlware, express.static(path.join(__dirname, `../${DIR_UPLOAD}`)));

// Rutas de la API
API_APP.use('/', routes);

// Medio para manejar los errores 
API_APP.use(handleErrorMiddleware);


// // Implementacion desarrollo de dotenv para saber que hacer
// const PORT = PORT_SERVER || 3002;
// const URL_API = URL || 'localhost';
// const PROTOCOL = TYPE_CONN || 'http';

// // Puesta en marcha del server 
// API_APP.listen(PORT, () => {
//     console.log(`Escuchando en ${PROTOCOL}://${URL_API}:${PORT}/`);
// });

// Exporta el handler para Vercel (saldra por la url dicha)
export default API_APP;