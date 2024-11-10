import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/procesoCompraService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

export const GenerarCompra = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;
    const idToken = req.usuarioId;

    if (!datos) {
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    if (datos.id_Usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
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