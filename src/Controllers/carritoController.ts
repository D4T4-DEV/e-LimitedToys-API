import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/carritoService';
import { DataCarrito } from '../Interfaces/CarrritoInterface';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

export const AniadirProductoCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;
    const idToken = req.usuarioId;

    if (!datos) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (datos.id_Usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.AniadirProductoCarrito(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarProductoCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;
    const idToken = req.usuarioId;


    if (!datos) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (datos.id_Usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarProductoCarrito(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarProductoCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { userID, productoID } = req.params;
    const idToken = req.usuarioId;

    if (!userID || !productoID) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (userID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarProductoCarrito({ id_Usuario: userID, id_Producto: productoID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const idToken = req.usuarioId;

    if (!userID) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (userID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }
    // 10.2.5.57
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerCarrito(userID);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}