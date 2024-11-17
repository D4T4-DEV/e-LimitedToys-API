import { z } from 'zod';

export interface DataCompra {
    id_usuario: string;
}

export const DataCompraSchema = z.object({
    id_usuario: z.string(),
});