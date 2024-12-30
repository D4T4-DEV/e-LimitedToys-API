import { getConnectionMySQL } from "../DataBase/connector";
import { DataProduct } from "../Interfaces/ProductoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

const { PORT_SERVER, URL, TYPE_CONN, VERCEL_URL } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = VERCEL_URL || URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';
const URL_BASE = VERCEL_URL ? `${PROTOCOL}://${URL_API}` : `${PROTOCOL}://${URL_API}:${PORT}`;

/*
    El codigo comentado aqui,son medios que posiblemente se van implementar

export const AniadirProducto = async (data: DataProduct): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        nombre_producto,
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

export const ObtenerProductos = async (/*indice_catalogo: string*/): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerProductos(  )`, []);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData: DataProduct[] = result[0] || [];

        if (productosData.length > 0) {
            // Procesamos cada producto en productosData
            const DataProductos = productosData.map((producto: DataProduct) => {
                const { id_producto, nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencia } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // Separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    id_producto,
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencia
                };
            });

            return { status: 200, message: `Se ha devuelto los productos`, data: { DataProductos } };
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

export const ObtenerProductosDestacados = async (): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerProductosDestacados()`);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const productosData: DataProduct[] = result[0] || [];

        if (productosData.length > 0) {
            // Procesamos cada producto en productosData
            const DataProductos = productosData.map((producto: DataProduct) => {
                const { id_producto, nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencia } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // Separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    id_producto,
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencia
                };
            });

            return { status: 200, message: `Se ha devuelto los 12 productos destacados de la semana`, data: { DataProductos } };
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
                const { id_producto, nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencia } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    id_producto,
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencia
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
                const { id_producto, nombre_producto, descripcion, marca, imagenes_producto, precio_producto, precio_envio, existencia } = producto;

                // Division de `imagenes_producto` y agregacion de URL base a cada una
                const imagenesConURL = imagenes_producto!
                    .split(",") // separamos por comas
                    .map((img: string) => `${URL_BASE}${img.trim().replace(/\\/g, '/')}`) // concatenacion y eliminamos espacios en blanco

                return {
                    id_producto,
                    nombre_producto,
                    descripcion,
                    marca,
                    imagenes_producto: imagenesConURL,
                    precio_producto,
                    precio_envio,
                    existencia
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

export const ObtenerMarcasYPrecios = async (/*indice_catalogo: string*/): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`CALL ObtenerPrecioYMarca( )`, []);

        // Se obtiene lo que viene de la consulta, se hace de esta manera, ya que el resultado del procedure son 2 tablas
        const marcasData = result[0] || [];
        const preciosData = result[1] || [];

        // Se comprueba que exitan los datos en ambos resultados
        if (marcasData.length > 0 || preciosData.length > 0) {
            //Mepea las marcas
            const Marcas = marcasData.map((marca: { marca: string }) => marca.marca);

            // Procesa los precios (se toman los nombres del procedure)
            const { Precio_Maximo, Precio_Minimo } = preciosData[0] || { Precio_Maximo: null, Precio_Minimo: null };

            return {
                status: 200,
                message: `Se han devuelto las marcas y los precios`,
                data: {
                    Marcas,
                    Precio_Maximo,
                    Precio_Minimo,
                },
            };
        }

        // Si no se encuentran los precios o marcas se muestra el siguiente error
        return { status: 404, message: `No se encontraron marcas ni precios` };
    } catch (error) {
        const customError = new Error(`ObtenerPrecioYMarca() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
};