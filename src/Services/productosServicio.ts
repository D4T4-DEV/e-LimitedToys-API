import { DataProduct } from "../Interfaces/ProductoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Models from '../Models/ProductoModel';

/*
    Posibles implementaciones
*/

/*
export const AniadirProducto = async (data: DataProduct): Promise<Respuesta> => {
    try {
        return Models.AniadirProducto(data);
    } catch (err) {
        throw err;
    }
}

export const EditarProducto = async (data: DataProduct): Promise<Respuesta> => {
    try {
        return Models.EditarProducto(data);
    } catch (err) {
        throw err;
    }
}

export const EliminarProducto = async (data: DataProduct): Promise<Respuesta> => {
    try {
        return Models.EliminarProducto(data);
    } catch (err) {
        throw err;
    }
}

    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios y controladores)
*/
export const ObtenerProductos = async (data: string): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductos(data);
    } catch (err) {
        throw err;
    }
}

export const ObtenerProductoID = async (data: string): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductoID(data);
    } catch (err) {
        throw err;
    }
}


export const ObtenerProductosBuscador = async (lista: string, filter: string): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductosBuscador(lista, filter);
    } catch (err) {
        throw err;
    }
}