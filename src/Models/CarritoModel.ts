import { getConnectionMySQL } from "../DataBase/connector";
import { DataCarrito } from "../Interfaces/CarrritoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

export const AniadirProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_Usuario,
        id_Producto,
        existencias
    } = data;

    const conn_MYSQL = getConnectionMySQL();

    try {
        return { status: 200, message: 'Se creo correctamente el producto' };
    } catch (error) {
        const customError = new Error(`AniadirProducto() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}

export const EditarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_Usuario,
        id_Producto,
        existencias
    } = data;


    const conn_MYSQL = getConnectionMySQL();

    try {
        return { status: 200, message: 'Se ha editado el producto correctamente' };
    } catch (error) {
        const customError = new Error(`EditarProducto() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}

export const EliminarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_Usuario,
        id_Producto
    } = data;


    const conn_MYSQL = getConnectionMySQL();

    try {
        return { status: 200, message: 'Se ha eliminado el producto correctamente' };
    } catch (error) {
        const customError = new Error(`EliminarProductoCarrito() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}

export const ObtenerCarrito = async (userID: string): Promise<Respuesta> => {

    const conn_MYSQL = getConnectionMySQL();

    try {
        return { status: 200, message: 'Devolvi el carrito', data: {a: 'a'}};
    } catch (error) {
        const customError = new Error(`ObtenerCarrito() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}