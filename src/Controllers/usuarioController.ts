import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/usuarioService';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';
import * as CryptFunctions from '../Security/Encr_decp';
import { CheckExistSchema, DeletePhotoProfileSchema, EditAddressSchema, EditNickNameSchema, EditPhotoProfileSchema, LoginShema, User_ID_Schema, UserDataSchema } from '../Interfaces/UsuarioInterface';

export const RegistrarUsuario = async (req: Request, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    // Validacion de datos por ZOD
    const resultValidateData = UserDataSchema.safeParse(datos);

    if (!resultValidateData.success) {
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

    // Validacion de datos por ZOD
    const resultValidateData = LoginShema.safeParse(datos);

    if (!resultValidateData.success) {
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
    // Validacion de datos por ZOD
    const resultValidateData = User_ID_Schema.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    const { user_ID } = req.params;
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
    // Validacion de datos por ZOD
    const resultValidateData = User_ID_Schema.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    const { id_usuario } = req.params;
    const idToken = req.usuarioId;

    if (id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerDatosUsuario({ id_usuario });
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}


export const ChecarExistenciaEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { emailDecript } = req.params;

    try {
        const decodedEmail = decodeURIComponent(emailDecript);
        const datos = await CryptFunctions.DesencriptarDatos(decodedEmail);
        
        // Validacion de datos por ZOD
        const resultValidateData = CheckExistSchema.safeParse(datos);
    
        if (!resultValidateData.success) {
            res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
            return;
        }

        const resultadoOperacion: Respuesta = await Servicios.ChecarExistenciaEmail(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarDireccion = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    // Validacion de datos por ZOD
    const resultValidateData = EditAddressSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;
    if (datos.id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida para este usuario' })
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarDireccion(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarNick = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {
    const { datos } = req.body;

    // Validacion de datos por ZOD
    const resultValidateData = EditNickNameSchema.safeParse(datos);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;
    if (datos.id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarNick(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarFotoPerfil = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {

    const { datos } = req.body;
    
    // Validacion de datos por ZOD
    const resultValidateData = EditPhotoProfileSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datos.id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarFotoPerfil(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarFotoPerfil = async (req: RequestPersonalizado, res: Response, next: NextFunction) => {

    const { datos } = req.body;

    // Validacion de datos por ZOD
    const resultValidateData = DeletePhotoProfileSchema.safeParse(datos);

    if (!resultValidateData.success) {
        res.status(400).json({ status: 401, message: 'No se enviaron los datos correctos' });
        return;
    }

    const idToken = req.usuarioId;

    if (datos.id_usuario != idToken) {
        res.status(401).json({ status: 401, message: 'Operacion no valida' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarFotoPerfil(datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}
