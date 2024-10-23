import { NextFunction, Request, Response } from 'express';
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Servicios from '../Services/bannerService';

export const ObtenerBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerBanners();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}