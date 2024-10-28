import { NextFunction, Request, Response } from 'express';
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Servicios from '../Services/bannerService';
import path from 'path';

// Toma de las variables del archivo env (desestructuracion)
const { DIR_UPLOAD } = process.env;

export const ObtenerBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerBanners();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const SubirBanner = async (req: Request, res: Response, next: NextFunction) => {

    const pathRelativo = req.body.datos.pathRelative;

    if(!pathRelativo){
        return;
    }

    try {

        // Usar split para dividir la cadena por '/' o '\\' esto para obtener los pedazos
        const partesURL = pathRelativo.split(/[/\\]/); // Dividir por '/' o '\'

        // Obtiene el ultimo elemento de la URL
        const nombreArchivo = partesURL.pop(); 

        // Guardado
        const resultadoOperacion = await Servicios.SubirBanner(pathRelativo, nombreArchivo);
        res.status(resultadoOperacion.status).json(resultadoOperacion);
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
};

export const BorrarBanner = async (req: Request, res: Response, next: NextFunction) => {

    const { id_banner, nameImagen } = req.params;

    try {
        const resultadoOperacion: Respuesta = await Servicios.BorrarBanner(id_banner, nameImagen);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}