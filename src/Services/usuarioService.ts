import { Respuesta } from "../Interfaces/ResponseInterface";
import { UserData } from "../Interfaces/UsuarioInterface";
import *as Models from '../Models/UsuarioModel';

export const RegistrarUsuario = async (data: any): Promise<Respuesta> => {
    try {
        return Models.RegistrarUsuario(data);
    } catch (err) {
        throw err;
    }
}

export const IniciarSesion = async (data: any): Promise<Respuesta> => {
    try {
        return Models.IniciarSesion(data);
    } catch (err) {
        throw err;
    }
}

export const EditarUsuario = async (data: any): Promise<Respuesta> => {
    try {
        return Models.EditarUsuario(data);
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