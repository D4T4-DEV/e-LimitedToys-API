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

export const ObtenerProductos = async (data: string): Promise<Respuesta> => {

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerProductos( ? )`, [data]);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData = result[0] || [];

        if (productosData.length > 0) {
            return { status: 200, message: `Se ha devuelto los 15 productos del indice ${data}`, data: { productosData } };
        }

        return { status: 200, message: `No hay productos` };
    } catch (error) {
        const customError = new Error(`ObtenerProductos() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}