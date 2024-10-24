import { Respuesta } from "../Interfaces/ResponseInterface";
import *as Models from '../Models/bannerModel';


export const ObtenerBanners = async (): Promise<Respuesta> => {
    try {
        return Models.ObtenerBanners();
    } catch (err) {
        throw err;
    }
}

export const SubirBanner = async (ruta: string, nombreArchivo: string): Promise<Respuesta> => {
    try {
        return Models.SubirBanner(ruta, nombreArchivo);
    } catch (err) {
        throw err;
    }
}

export const BorrarBanner = async (idBanner: string, nameImagen: string): Promise<Respuesta> => {
    try {
        return Models.BorrarBanner(idBanner, nameImagen);
    } catch (err) {
        throw err;
    }
}