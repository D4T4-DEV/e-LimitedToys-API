import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Models from '../Models/procesoCompraModel';

export const GenerarCompra = async (data: any): Promise<Respuesta> => {
    try {
        return Models.GenerarCompra(data);
    } catch (err) {
        throw err;
    }
}
