import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/productosServicio';

export const AniadirProducto = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.AniadirProducto(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarProducto = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarProducto(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarProducto = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarProducto(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}