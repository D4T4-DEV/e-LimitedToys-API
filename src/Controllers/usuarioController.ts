import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/usuarioService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

export const RegistrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    if (!datos) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

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

    if (!datos) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.IniciarSesion(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarUsuario = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { user_ID } = req.params;
    
    if (!user_ID) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }
    
    const idToken = req.usuarioId;
    
    if (user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarUsuario({ id_usuario: user_ID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerDatosUsuario = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { user_ID } = req.params;

    if (!user_ID) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;
    if (user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerDatosUsuario({ id_usuario: user_ID });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarDireccion = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const datosParse = (req.body.datos);

    if (typeof datosParse !== 'object' || datosParse === null) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datosParse.user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' })
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarDireccion(datosParse);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarNick = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const datosParse = (req.body.datos);

    if (typeof datosParse !== 'object' || datosParse === null) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datosParse.user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarNick(datosParse);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarFotoPerfil = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {

    const datosParse = (req.body.datos);

    if (typeof datosParse !== 'object' || datosParse === null) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datosParse.user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarFotoPerfil(datosParse);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarFotoPerfil = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {

    const datosParse = (req.body.datos);

    if (typeof datosParse !== 'object' || datosParse === null) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datosParse.user_ID != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarFotoPerfil(datosParse);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}
