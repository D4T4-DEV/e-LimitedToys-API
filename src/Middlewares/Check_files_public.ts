import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { verifyTokenMiddleware } from './Verify_token';
import { verificarAccesoImgProfile } from '../Security/Check_acc_imgs';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

// Toma de las variables del archivo env (desestructuracion)
const { DIR_UPLOAD } = process.env;

export function checkFileAccessMiddlware(req: RequestPersonalizado, res: Response, next: NextFunction) {

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
        verifyTokenMiddleware(req, res, async () => {
            // Verificamos el acceso al recurso solicitado
            // pasandole los valores al usuario
            const userHasAccess = await verificarAccesoImgProfile(req.usuarioId!, requestedFile);

            if (!userHasAccess) {
                return res.status(403).json({ status: 403, mensaje: 'Acceso denegado al recurso solicitado' });
            }

            return next(); // Devuelve el recurso si tiene acceso
        });
    }
}