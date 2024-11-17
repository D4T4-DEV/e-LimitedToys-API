import { z } from 'zod';

export interface DataCarrito {
    id_usuario?: string;
    id_producto?: string;
    existencias?: number;
}

export const DataCarritoSchema = z.object({
    id_usuario: z.string(),
    id_producto: z.string(),
    existencias: z.number()
});

export const ParamsCarritoSchema = DataCarritoSchema.pick({
    id_usuario: true,
    id_producto: true
});

export const GetCarritoSchema = DataCarritoSchema.pick({
    id_usuario: true,
});