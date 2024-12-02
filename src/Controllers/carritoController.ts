import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/carritoService';
import { DataCarritoSchema, GetCarritoSchema, ParamsCarritoSchema } from '../Interfaces/CarrritoInterface';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

export const AniadirProductoCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;
    const idToken = req.usuarioId;

    // Validacion de datos por ZOD
    const resultValidateData = DataCarritoSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (datos.id_usuario != idToken) {
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

    // Validacion de datos por ZOD
    const resultValidateData = DataCarritoSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    if (datos.id_usuario != idToken) {
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

    // Validacion de datos por ZOD
    const resultValidateData = ParamsCarritoSchema.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }
    const { id_usuario, id_producto } = req.params;
    const idToken = req.usuarioId;

    if (id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarProductoCarrito({ id_usuario: id_usuario, id_producto: id_producto });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerCarrito = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    // Validacion de datos por ZOD
    const resultValidateData = GetCarritoSchema.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    const { id_usuario } = req.params;
    const idToken = req.usuarioId;

    if (id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerCarrito(id_usuario);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}