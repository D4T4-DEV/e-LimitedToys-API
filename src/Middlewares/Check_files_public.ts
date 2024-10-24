import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { verifyTokenMiddleware } from './Verify_token';

// Toma de las variables del archivo env (desestructuracion)
const { DIR_UPLOAD } = process.env;

export function checkFileAccessMiddlware(req: Request, res: Response, next: NextFunction) {

    // Normaliza la ruta para verse -> ./algo/algoOtro/
    const requestedFile = path.normalize(path.join(__dirname, `../../${DIR_UPLOAD}`, req.path));

    // Lista de directorios permitidos
    const allowedDirectories = [
        path.normalize(path.join(__dirname, `../../${DIR_UPLOAD}/Public`)),
    ];

    // Verificar si el archivo solicitado es publico o no
    const isAllowed = allowedDirectories.some((allowedDir) => requestedFile.startsWith(allowedDir));

    if (isAllowed) {
        // Continuar con el siguiente middleware (autoriza el siguiente)
        return next();
    } else {
        // Si no esta en el directorio, aplica autenticación de token
        return verifyTokenMiddleware(req, res, next);
    }
}
