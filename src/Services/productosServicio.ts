import { DataProduct } from "../Interfaces/ProductoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Models from '../Models/ProductoModel';

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