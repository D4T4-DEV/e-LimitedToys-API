import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/procesoCompraService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';
import { DataCompraSchema } from '../Interfaces/CompraInterface';

export const GenerarCompra = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    // Validacion de datos por ZOD
    const resultValidateData = DataCompraSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;
    if (datos.id_usuario != idToken) {
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