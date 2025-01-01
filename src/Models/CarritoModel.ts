import { getConnectionMySQL } from "../DataBase/connector";
import { DataCarrito } from "../Interfaces/CarrritoInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

const { PORT_SERVER, URL, TYPE_CONN, VERCEL_URL, URL_VERCEL } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = VERCEL_URL || URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';
const URL_BASE =  URL_VERCEL || `${'https://' + VERCEL_URL}`;

export const AniadirProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        id_producto,
        existencias
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        const [result]: any[] = await conn_MYSQL.query(`CALL Agregar_modificar_carrito(?, ?, ?, @mensaje)`,
            [id_usuario, id_producto, (existencias! < 0 ? 0 : existencias)]);

        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);

        const mensaje = mensajeResult[0]?.mensaje;

        if (mensaje != 'Cantidad excede las existencias disponibles en el inventario') {
            return { status: 200, message: mensaje };
        }

        return { status: 400, message: mensaje };

    } catch (error) {
        const customError = new Error(`AniadirProducto() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EditarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        id_producto,
        existencias
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        const [result]: any[] = await conn_MYSQL.query(`CALL Agregar_modificar_carrito(?, ?, ?, @mensaje)`,
            [id_usuario, id_producto, existencias]);

        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);

        const mensaje = mensajeResult[0]?.mensaje;

        if (mensaje != 'Cantidad excede las existencias disponibles en el inventario') {
            return { status: 200, message: mensaje };
        }

        return { status: 400, message: mensaje };
    } catch (error) {
        const customError = new Error(`EditarProducto() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EliminarProductoCarrito = async (data: DataCarrito): Promise<Respuesta> => {

    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        id_producto
    } = data;


    const conn_MYSQL = await getConnectionMySQL();

    try {

        const [result]: any[] = await conn_MYSQL.query(`DELETE FROM carrito WHERE (id_usuario = ? AND id_producto = ?);`, 
            [id_usuario, id_producto]);

        if (result.affectedRows > 0) {
            return { status: 200, message: 'Se ha eliminado el producto correctamente' };
        }

        return { status: 404, message: 'El producto no existe en el carrito' };

    } catch (error) {
        const customError = new Error(`EliminarProductoCarrito() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const ObtenerCarrito = async (userID: string): Promise<Respuesta> => {

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[] = await conn_MYSQL.query(`CALL ObtenerCarrito( ?, @mensaje)`, [userID]);
        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);

        const mensaje = mensajeResult[0]?.mensaje;

        if (mensaje === 'El usuario no tiene carrito') {
            return { status: 404, message: 'No se encontro un carrito con el Id del usuario proporcionado' };
        } else {
            const datosCarrito = result[0];

            const datosCarritoProcesado = datosCarrito.map((producto: any) => ({
                ...producto,
                imagen_producto: `${URL_BASE}/${producto.imagen_producto.replace(/\\/g, "/")}`,
                total_a_pagar: `${Number(producto.precio_producto) * Number(producto.cantidad_seleccionada) + Number(producto.precio_envio)}`,
            }));

            return { status: 200, message: `Devolvi el carrito`, data: { datosCarritoProcesado } };
        }

    } catch (error) {
        const customError = new Error(`ObtenerCarrito() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}