import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";


export const GenerarCompra = async (data: any): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[]= await conn_MYSQL.query(``);

        return { status: 200, message: 'Compra realizada exitosamente'};

    } catch (error) {
        const customError = new Error(`GenerarCompra() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
};
