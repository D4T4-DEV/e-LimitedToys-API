import { Respuesta } from "../Interfaces/ResponseInterface";
import *as Models from '../Models/bannerModel';


export const ObtenerBanners = async (): Promise<Respuesta> => {
    try {
        return Models.ObtenerBanners();
    } catch (err) {
        throw err;
    }
}
