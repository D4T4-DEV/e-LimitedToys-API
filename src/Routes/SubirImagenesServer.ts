import express, { NextFunction, Request, Response  } from 'express';
import path from 'path';
import upload from '../Multer/Configuracion_multer';
const Router = express.Router();
// Toma de las variables del archivo env (desestructuracion)
const { DIR_UPLOAD } = process.env;


// Respuesta que dara para saber el estado del servidor
Router.post('/new',
    upload.single('imagen'),
(req: Request, res: Response, next: NextFunction) => {

    // Si no tiene un archivo 
    if (!req.file) {
        res.status(400).json({ status: 400, message: 'No se ha cargado ningun archivo' });
        return;
    }

    const pathData = req.body.path;
    // Nombre de la subcarpeta dentro de la carpeta seleccionada para subir archivos
    const subcarpeta = pathData || 'default'; // Si tiene alguna definida la usa, si no usa default
    try {
        const nombreArchivo = req.file.filename;
        const ruta = path.join(DIR_UPLOAD!, subcarpeta, nombreArchivo).replace(/\\/g, '/'); // Ruta completa donde se guardara el archivo siendo: uploads/${subcarpeta}/${nombre_archivo.algo}

        res.status(200).json({path_relative: ruta});
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
})

export default Router;