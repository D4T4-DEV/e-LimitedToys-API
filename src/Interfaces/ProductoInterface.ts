import { string, z } from 'zod';

export interface DataProduct {
    id_product?: string;
    nombre_producto?: string;
    marca?: string;
    descripcion?: string;
    categoria?: string;
    imagenes_producto?: string;
    precio_producto?: number;
    precio_envio?: number;
    existencia?: number;
}

export const DataProductSchema = z.object({
    id_product: z.string().optional(),
    nombre_producto: z.string(),
    marca: z.string(),
    descripcion: z.string(),
    categoria: z.string(),
    imagenes_producto: z.string(),
    precio_producto: z.number(),
    precio_envio: z.number(),
    existencia: z.number(),
});

export const GetProductForIDSchema = DataProductSchema.pick({}).extend({
    id_product: string(),
});

export const GetProductsForIndex = DataProductSchema.pick({}).extend({
    indice: string(),
});

export const GetProductsForFilter = DataProductSchema.pick({}).extend({
    indice: string(),
    filter: string()
});