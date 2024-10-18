import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";


export const RegistrarUsuario = async (data: any): Promise<Respuesta> => {

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
        return { status: 200, message: 'Se creo correctamente el usuario' };
    } catch (error) {
        const customError = new Error(`RegistrarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}

export const EditarUsuario = async (data: any): Promise<Respuesta> => {

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
        return { status: 200, message: 'Se edito correctamente el usuario' };
    } catch (error) {
        const customError = new Error(`EditarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}

export const EliminarUsuario = async (data: any): Promise<Respuesta> => {

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
        return { status: 200, message: 'Se elimino correctamente el usuario' };
    } catch (error) {
        const customError = new Error(`EliminarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        (await conn_MYSQL).release();
    }
}