import { RowDataPacket } from "mysql2";
import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";

const { PORT_SERVER, URL, TYPE_CONN, VERCEL_URL } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = VERCEL_URL || URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';
const URL_BASE = `${'https://' + VERCEL_URL}`;

interface Banner extends RowDataPacket {
    id_banner: number;
    banner_img: string;
}

export const ObtenerBanners = async (): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: [Banner[], any] = await conn_MYSQL.query(`SELECT * FROM Banners`);

        if (result.length === 0) {
            return { status: 404, message: 'No tengo ningun banner' };
        }

        // Mapear los banners y agregar la URL completa de las imágenes
        const bannersImgs = result.map(({ banner_img }) => {
            return {
                img_url: `${URL_BASE}/${banner_img.trim().replace(/\\/g, '/')}`
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

/*
// POSIBLES IMPLEMENTACIÓNES DESPUES
export const SubirBanner = async (rutaRelativa: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any = await conn_MYSQL.query(`INSERT INTO banners (banner_img) VALUES (?)`, [rutaRelativa]);

        if (result.affectedRows === 0) {
            return { status: 500, message: 'No se subio la imagen, porfavor intentelo mas tarde' };
        }

        return { status: 200, message: 'Se subio el banner' };
    } catch (error) {
        const customError = new Error(`ObtenerBanners() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const BorrarBanner = async (idBanner: string): Promise<Respuesta> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [relativePathAnt]: any = await conn_MYSQL.query(`SELECT banner_img FROM Banners WHERE id_banner = (?)`, [idBanner]);
        const rutaImagen = relativePathAnt[0]?.banner_img;

        if (!rutaImagen) {
            return { status: 404, message: `Imagen con ID ${idBanner} no existe` };
        }

        const [result]: any[] = await conn_MYSQL.query(`DELETE FROM banners WHERE (id_banner = ?)`, [idBanner]);

        const nombreImagen = path.basename(rutaImagen);
        
        if (result.affectedRows === 0) {
            return { status: 500, message: 'No se elimino el banner, porfavor intentelo mas tarde' };
        }

        // ASPECTO PARA ELIMINAR LA IMAGEN DEL DIRECTORIO
        const imagePath = path.join(__dirname, `../../${rutaImagen}`);

        // Verifica si la imagen existe antes de eliminarla
        try {
            await fs.promises.access(imagePath, fs.constants.F_OK);

            // Elimina la imagen del servidor
            await fs.promises.unlink(imagePath);
            return { status: 200, message: `Se eliminó correctamente la imagen de id ${idBanner} que tenia el nombre ${nombreImagen}` };
        } catch (err) {
            console.error(`Error al eliminar la imagen ${nombreImagen}:`, err);
            return { status: 500, message: `Surgió un error al tratar de eliminar la imagen de id ${idBanner} que tenia el nombre ${nombreImagen}` };
        }

    } catch (error) {
        const customError = new Error(`BorrarBanner() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}
*/