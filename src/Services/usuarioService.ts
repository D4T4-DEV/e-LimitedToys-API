import { Respuesta } from "../Interfaces/ResponseInterface";
import { UserData } from "../Interfaces/UsuarioInterface";
import *as Models from '../Models/UsuarioModel';

export const RegistrarUsuario = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.RegistrarUsuario(data);
    } catch (err) {
        throw err;
    }
}

export const IniciarSesion = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.IniciarSesion(data);
    } catch (err) {
        throw err;
    }
}

export const ChecarExistenciaEmail = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.ChecarExistenciaEmail(data);
    } catch (err) {
        throw err;
    }
}

export const EditarDireccion = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.EditarDireccion(data);
    } catch (err) {
        throw err;
    }
}

export const EditarNick = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.EditarNick(data);
    } catch (err) {
        throw err;
    }
}

export const EditarFotoPerfil = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.EditarFotoPerfil(data);
    } catch (err) {
        throw err;
    }
}

export const EliminarFotoPerfil = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.EliminarFotoPerfil(data);
    } catch (err) {
        throw err;
    }
}

export const EliminarUsuario = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.EliminarUsuario(data);
    } catch (err) {
        throw err;
    }
}

export const ObtenerDatosUsuario = async (data: UserData): Promise<Respuesta> => {
    try {
        return Models.ObtenerDatosUsuario(data);
    } catch (err) {
        throw err;
    }
}