import jwt, { SignOptions } from "jsonwebtoken";

type JsonData = { [key: string]: any };

const { RSA_PRIVATE_KEY } = process.env;

const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '6h', // Tiempo de expiracion
}

export const GenerarToken = (payload: JsonData): string => {

    if (!RSA_PRIVATE_KEY) {
        throw new Error('La clave RSA no esta definida');
    }
    
    try {
        const token = jwt.sign(payload, RSA_PRIVATE_KEY as string, options);
        return token;
    } catch (err) {
        throw err;
    }
};