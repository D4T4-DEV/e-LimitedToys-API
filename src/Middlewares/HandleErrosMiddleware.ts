import { Request, Response, NextFunction } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';

// Estilos para la consola 
const bold: string  = '\x1b[1m';
const txt_normal: string = '\x1b[0m';
const red: string = '\x1b[31m';
const blue: string = '\x1b[34m';

export function handleErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toLocaleString();
    console.error(`${timestamp} - Error en la solicitud: ${bold}${red}${err}${txt_normal}\n\n ${bold}${blue}Error desglozado:${txt_normal}\n`, err);

    // Definir código de estado y mensaje basado en el error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Se produjo un error en el servidor :(';

    // Respuesta estándar para los errores
    const responseErr: Respuesta = {
        status: statusCode,
        message: message,
    };

    // Enviar la respuesta con el código de estado y el mensaje
    res.status(statusCode).json(responseErr);
}