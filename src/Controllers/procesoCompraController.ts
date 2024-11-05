import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/procesoCompraService';

export const GenerarCompra = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    if (!datos) {
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.GenerarCompra(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}