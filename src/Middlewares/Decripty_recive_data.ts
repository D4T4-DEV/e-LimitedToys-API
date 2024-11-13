import { Request, Response, NextFunction } from 'express';
import * as CryptFunctions from '../Security/Encr_decp';
import { Respuesta } from '../Interfaces/ResponseInterface';

type JsonData = { [key: string]: any }; // -> Objeto JSON 

// Respuestas predeterminadas
const responseNoData: Respuesta = { status: 400, message: 'No se enviaron los datos' };

export async function proccessDecryptDataMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {

    // Obtencion de los datos 
    const { datos_encriptados } = req.body;

    // Checamos que exista el dato en el body
    if (!datos_encriptados) {
        res.status(responseNoData.status).send(responseNoData);
        return;
    }

    try {
        // Desencriptado de la funcion
        const datos_json: JsonData = await CryptFunctions.DesencriptarDatos(datos_encriptados);
        req.body.datos = datos_json;
        next();
    } catch (err) {
        console.error("Error al desencriptar los datos en el middleware:", err);
        const customError = new Error('Error al desencriptar los datos. Verifica la información proporcionada');
        (customError as any).statusCode = 400;
        next(customError);
    }
}