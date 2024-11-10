import { getConnectionMySQL } from "../DataBase/connector";
import { DataCompra } from "../Interfaces/CompraInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";

export const GenerarCompra = async (datos: DataCompra): Promise<Respuesta> => {
    const { id_usuario } = datos;
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[] = await conn_MYSQL.query(`CALL ProcesarCompra(?, @mensaje)`, [id_usuario]);
        const datosResultado = result[0];

        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);
        const mensaje = mensajeResult[0]?.mensaje;

        if (mensaje) {
            return { status: 200, message: mensaje };
        }
        return { status: 401, message: 'El carrito tiene productos que sobrepasan el inventario', data: datosResultado };
    } catch (error) {
        const customError = new Error(`GenerarCompra() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
};
