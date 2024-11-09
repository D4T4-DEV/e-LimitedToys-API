import { Respuesta } from "../Interfaces/ResponseInterface";
import *as Models from '../Models/bannerModel';


export const ObtenerBanners = async (): Promise<Respuesta> => {
    try {
        return Models.ObtenerBanners();
    } catch (err) {
        throw err;
    }
}
/*
// POSIBLES IMPLEMENTACIÓNES DESPUES
export const SubirBanner = async (rutaRelativa: string): Promise<Respuesta> => {
    try {
        return Models.SubirBanner(rutaRelativa);
    } catch (err) {
        throw err;
    }
}

export const BorrarBanner = async (idBanner: string): Promise<Respuesta> => {
    try {
        return Models.BorrarBanner(idBanner);
    } catch (err) {
        throw err;
    }
}

*/