import { RowDataPacket } from "mysql2";
import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";
import path from "path";
import fs from 'fs';

const { PORT_SERVER, URL, DIR_BANNERS, TYPE_CONN } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';

interface Banner extends RowDataPacket {
    id_banner: number;
    banner_img: string;
    nombre_tipo: string;
}

export const ObtenerBanners = async (): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();
    const baseURL = `${PROTOCOL}://${URL_API}:${PORT}`;

    try {
        const [result]: [Banner[], any] = await conn_MYSQL.query(`SELECT * FROM Banners`);

        if (result.length === 0) {
            return { status: 404, message: 'No tengo ningun banner' };
        }

        // Mapear los banners y agregar la URL completa de las imágenes
        const bannersImgs = result.map(({ id_banner, nombre_tipo, banner_img }) => {
            return {
                id_img: id_banner,
                nombre_img: nombre_tipo,
                img_url: `${baseURL}/${banner_img.trim().replace(/\\/g, '/')}`
            };
        });

        return { status: 200, message: 'Devolviendo banners', data: { bannersImgs } };

    } catch (error) {
        const customError = new Error(`ObtenerBanners() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
};

export const SubirBanner = async (ruta: string, nombreArchivo: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`INSERT INTO banners (banner_img, nombre_tipo) VALUES (?, ?)`, [ruta, nombreArchivo]);

        if (result.affectedRows === 0) {
            return { status: 500, message: 'No se subio la imagen, porfavor intentelo mas tarde' };
        }

        return { status: 200, message: 'Se subio la imagen' };
    } catch (error) {
        const customError = new Error(`ObtenerBanners() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const BorrarBanner = async (idBanner: string, nameImagen: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`DELETE FROM banners WHERE (id_banner = ?)`, [idBanner]);

        if (result.affectedRows === 0) {
            return { status: 404, message: `Imagen con ID ${idBanner} y ${nameImagen} no existe` };
        }


        // ASPECTO PARA ELIMINAR LA IMAGEN DEL DIRECTORIO
        const imagePath = path.join(__dirname, `../../${DIR_BANNERS}`, nameImagen);

        // Verifica si la imagen existe antes de eliminarla
        try {
            await fs.promises.access(imagePath, fs.constants.F_OK);

            // Elimina la imagen del servidor
            await fs.promises.unlink(imagePath);
            return { status: 200, message: `Se eliminó correctamente ${nameImagen}` };
        } catch (err) {
            console.error(`Error al eliminar la imagen ${nameImagen}:`, err);
            return { status: 500, message: `Surgió un error al tratar de eliminar ${nameImagen}` };
        }

    } catch (error) {
        const customError = new Error(`BorrarBanner() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}