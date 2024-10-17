import { getConnectionMySQL } from "../DataBase/connector";
import { DataProduct } from "../Interfaces/ProductoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

export const AniadirProducto = async (data: DataProduct): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        nombreProducto,
        categoria,
        marca,
        descripcion,
        imagenesProducto,
        precio,
        precioEnvio,
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

export const EditarProducto = async (data: DataProduct): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        nombreProducto,
        categoria,
        marca,
        descripcion,
        imagenesProducto,
        precio,
        precioEnvio,
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

export const EliminarProducto = async (data: DataProduct): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        nombreProducto,
        categoria,
        marca,
        descripcion,
        imagenesProducto,
        precio,
        precioEnvio,
        existencias
    } = data;

    const conn_MYSQL = getConnectionMySQL();

    try {
        return { status: 200, message: 'Se ha eliminado el producto correctamente' };
    } catch (error) {
        const customError = new Error(`EliminarProducto() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}