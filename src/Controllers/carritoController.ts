import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/carritoService';
import { DataCarrito } from '../Interfaces/CarrritoInterface';

export const AniadirProductoCarrito = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.AniadirProductoCarrito(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarProductoCarrito = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarProductoCarrito(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarProductoCarrito = async (req: Request, res: Response, next: NextFunction) => {
    const { userID, productoID } = req.params;

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarProductoCarrito({id_Usuario: userID, id_Producto: productoID});
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerCarrito = async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerCarrito(userID);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}