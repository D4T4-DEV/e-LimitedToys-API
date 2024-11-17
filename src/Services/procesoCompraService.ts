import { DataCompra } from "../Interfaces/CompraInterface";
import { Respuesta } from "../Interfaces/ResponseInterface";
import * as Models from '../Models/procesoCompraModel';

export const GenerarCompra = async (data: DataCompra): Promise<Respuesta> => {
    try {
        return Models.GenerarCompra(data);
    } catch (err) {
        throw err;
    }
}
