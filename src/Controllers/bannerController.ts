import { NextFunction, Request, Response } from 'express';
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Servicios from '../Services/bannerService';

export const ObtenerBanners = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerBanners();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

/*
// POSIBLES IMPLEMENTACIÓNES DESPUES
export const SubirBanner = async (req: Request, res: Response, next: NextFunction) => {

    const { pathRelativo } = req.body.datos;

    if (!pathRelativo) {
        res.status(400).send({ status: 400, message: 'No se proporcionaron los datos necesarios' });
        return;
    }

    try {
        // Guardado
        const resultadoOperacion = await Servicios.SubirBanner(pathRelativo);
        res.status(resultadoOperacion.status).json(resultadoOperacion);
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
};

export const BorrarBanner = async (req: Request, res: Response, next: NextFunction) => {

    const { id_banner } = req.params;

    try {
        const resultadoOperacion: Respuesta = await Servicios.BorrarBanner(id_banner);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

*/