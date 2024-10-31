import { getConnectionMySQL } from "../DataBase/connector";
import { DataProduct } from "../Interfaces/ProductoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

const { PORT_SERVER, URL, TYPE_CONN } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';
const URL_BASE = `${PROTOCOL}://${URL_API}:${PORT}/`;

/*
    El codigo comentado aqui,son medios que posiblemente se van implementar

export const AniadirProducto = async (data: DataProduct): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        nombre_producto,
        categoria,
        marca,
        descripcion,
        imagenes_producto,
        precio_producto,
        precio_envio,
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
        nombre_producto,
        categoria,
        marca,
        descripcion,
        imagenes_producto,
        precio_producto,
        precio_envio,
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
        nombre_producto,
        categoria,
        marca,
        descripcion,
        imagenes_producto,
        precio_producto,
        precio_envio,
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


    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios, controladores y modelos)
*/

export const ObtenerProductos = async (indice_catalogo: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerProductos( ? )`, [indice_catalogo]);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData: DataProduct[] = result[0] || [];

        if (productosData.length > 0) {
            // Procesamos cada producto en productosData
            const DataProductos = productosData.map((producto: DataProduct) => {
                const { nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencias } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // Separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencias
                };
            });

            return { status: 200, message: `Se ha devuelto los 15 productos del índice ${indice_catalogo}`, data: { DataProductos } };
        }

        return { status: 404, message: `No hay productos` };
    } catch (error) {
        const customError = new Error(`ObtenerProductos() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
};

export const ObtenerProductoID = async (id_producto: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();


    try {
        const [result]: any[] = await conn_MYSQL.query(`CALL ObtenerProductoPorID( ? )`, [id_producto]);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData: DataProduct[] = result[0] || [];

        if (Array.isArray(productosData) && productosData.length > 0) {
            const DataProductos = productosData.map((producto: DataProduct) => {
                const { nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencias } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencias
                };
            });
            return { status: 200, message: `Se ha devuelto los datos del producto`, data: { DataProductos } };
        }

        return { status: 404, message: `No existe un producto con id ${id_producto}` };
    } catch (error) {
        const customError = new Error(`ObtenerProductoID() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const ObtenerProductosBuscador = async (lista: string, filter: string): Promise<Respuesta> => {

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerProductosPorFiltro( ? , ? )`, [lista, filter]);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData: DataProduct[] = result[0] || [];

        if (Array.isArray(productosData) && productosData.length > 0) {
            const DataProductos = productosData.map((producto: DataProduct) => {
                const { nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencias } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencias
                };
            });
            return { status: 200, message: `Se ha devuelto los datos del producto por el input ${filter} y pagina ${lista}`, data: { DataProductos } };
        }

        return { status: 404, message: `No hay productos que cumplan con el filtro: ${filter}` };
    } catch (error) {
        const customError = new Error(`ObtenerProductosBuscador() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}