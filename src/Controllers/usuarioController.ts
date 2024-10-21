import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/usuarioService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

export const RegistrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.RegistrarUsuario(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const IniciarSesion = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.IniciarSesion(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarUsuario(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarUsuario = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { user_ID } = req.params;
    const idToken = req.usuarioId;

    if (user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' })
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarUsuario({ user_ID: user_ID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}