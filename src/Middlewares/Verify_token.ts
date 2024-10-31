import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // configuración de dotenv
import { Respuesta } from '../Interfaces/ResponseInterface';
import { RequestPersonalizado } from '../Interfaces/Request/personalizateRequestUser';

const { RSA_PRIVATE_KEY } = process.env;

const ResponseNoToken: Respuesta = {status: 401, message: 'Token no proporcionado'}; 
const ResponseTokenInvalid: Respuesta = {status: 403, message: 'Token inválido'}; 

export function verifyTokenMiddleware(req: RequestPersonalizado, res: Response, next: NextFunction): void {

    // Tomamos lo que viene de 'authorization'
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(ResponseNoToken.status).json(ResponseNoToken);
        return;
    }

    // Separamos los componentes de la cadena, siendo representado por un espacio ' '
    const token = authHeader.split(' ');
    jwt.verify(token[0], RSA_PRIVATE_KEY as string, { algorithms: ['RS256'] }, (err, decoded: any) => {
        if (err) {
            res.status(ResponseTokenInvalid.status).json(ResponseTokenInvalid);
            return;
        }

        req.usuario = decoded;
        req.usuarioId = decoded.id;
        next();
    });
}

// JwtPayload referencia a un interfaz con los datos que representan al token. Al entrar a la interfaz para conocer sus componentes
// redirecciona aqui https://datatracker.ietf.org/doc/html/rfc7519#section-4.1, para ejemplificar es cada uno de los componentes de esta interfaz
// a que referencian!

/* 
    iss?: string | undefined; -> Emisor token
    sub?: string | undefined; -> Sujeto del token 
    aud?: string | string[] | undefined; -> Hacia quien estara destinado
    exp?: number | undefined; -> Tiempo de expiracion del token
    nbf?: number | undefined; -> Fecha/hora antes de que el token deje de ser valido 
    iat?: number | undefined; -> Momento de emision del token
    jti?: string | undefined; -> Identificador unico para el token
*/

// Este medio para validar el token fue tomado de https://github.dev/JoshuaEGonzalezRuiz/demo_express_api/tree/main
// Gracias!