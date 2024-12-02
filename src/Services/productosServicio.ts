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

    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios, controladores y modelos)
*/
export const ObtenerProductos = async (/*indice_catalogo: string*/): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductos();
    } catch (err) {
        throw err;
    }
}

export const ObtenerProductosDestacados = async (): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductosDestacados();
    } catch (err) {
        throw err;
    }
}

export const ObtenerProductoID = async (id_producto: string): Promise<Respuesta> => {
    try {
        return Models.ObtenerProductoID(id_producto);
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

export const ObtenerMarcasYPrecios = async (): Promise<Respuesta> => {
    try {
        return Models.ObtenerMarcasYPrecios();
    } catch (err) {
        throw err;
    }
}
