import { NextFunction, Request, Response } from 'express';
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Servicios from '../Services/bannerService';
import path from 'path';

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

    // Si no tiene un archivo 
    if (!req.file) {
        res.status(400).json({ status: 400, message: 'No se ha cargado ningun archivo' });
        return;
    }

    // Nombre de la subcarpeta dentro de uploads
    const subcarpeta = req.body.subfolder || 'default'; // Si tiene alguna definida la usa, si no usa default
    try {

        const nombreArchivo = req.file.filename; // Nombre del archivo (opcional)
        const ruta = path.join('uploads', subcarpeta, req.file.filename); // Ruta completa donde se guardara el archivo siendo: uploads/${subcarpeta}/${nombre_archivo.algo}

        // Guardado
        const resultadoOperacion = await Servicios.SubirBanner(ruta, nombreArchivo);
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