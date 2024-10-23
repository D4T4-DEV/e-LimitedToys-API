import { RowDataPacket } from "mysql2";
import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";

interface Banner extends RowDataPacket {
    id: number; 
    banner_img:string;
}

export const ObtenerBanners = async (): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: [Banner[], any] = await conn_MYSQL.query(`SELECT * FROM Banners`);

        if(result.length > 0 ){
            const bannersImgs = result;
            return { status: 200, message: 'Devolviendo banners', data: {bannersImgs} };
        }
        return { status: 404, message: 'No tengo ningun banner' };
    } catch (error) {
        const customError = new Error(`ObtenerBanners() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const SubirBanner = async (ruta: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: [Banner[], any] = await conn_MYSQL.query(`INSERT INTO banners (banner_img) VALUES (?)`, [ruta]);
        return { status: 200, message: 'Se subio la imagen' };
    } catch (error) {
        const customError = new Error(`ObtenerBanners() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}