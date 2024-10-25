import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/usuarioService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';
import path from 'path';

// Toma de las variables del archivo env (desestructuracion)
const { DIR_UPLOAD } = process.env;

export const SubirImagen = async (req: Request, res: Response, next: NextFunction) => {
    // Si no tiene un archivo 
    if (!req.file) {
        res.status(400).json({ status: 400, message: 'No se ha cargado ningun archivo' });
        return;
    }

    // Nombre de la subcarpeta dentro de uploads
    const subcarpeta = req.body.subfolder || 'default'; // Si tiene alguna definida la usa, si no usa default
    try {

        const nombreArchivo = req.file.filename; // Nombre del archivo (opcional)
        const ruta = path.join(DIR_UPLOAD!, subcarpeta, nombreArchivo); // Ruta completa donde se guardara el archivo siendo: uploads/${subcarpeta}/${nombre_archivo.algo}
        res.status(200).json({path_relative: ruta});
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}


export const RegistrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.RegistrarUsuario(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const IniciarSesion = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.IniciarSesion(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarUsuario = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { user_ID } = req.params;
    const idToken = req.usuarioId;

    if (user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' })
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarUsuario({ user_ID: user_ID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerDatosUsuario = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { user_ID } = req.params;
    const idToken = req.usuarioId;

    if (user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' })
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerDatosUsuario({ user_ID: user_ID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarDireccion = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const datosParse = JSON.parse(req.body.datos);

    const idToken = req.usuarioId;

    if (datosParse.user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' })
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarDireccion(datosParse);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}
