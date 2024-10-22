import { DataCarrito } from "../Interfaces/CarrritoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Models from '../Models/CarritoModel';

export const AniadirProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {
    try {
        return Models.AniadirProductoCarrito(data);
    } catch (err) {
        throw err;
    }
}

export const EditarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {
    try {
        return Models.EditarProductoCarrito(data);
    } catch (err) {
        throw err;
    }
}

export const EliminarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {
    try {
        return Models.EliminarProductoCarrito(data);
    } catch (err) {
        throw err;
    }
}

export const ObtenerCarrito = async (data: string): Promise<Respuesta> => {
    try {
        return Models.ObtenerCarrito(data);
    } catch (err) {
        throw err;
    }
}