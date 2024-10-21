import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

// Interfaz para poder hacer un request personalizado
export interface RequestPersonalizado extends Request {
    usuario?: string | JwtPayload;
    usuarioId?: string;
}