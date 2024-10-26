export interface DataProduct {
    id_Product?: string;
    nombre_producto?: string;
    categoria?: string;
    marca?: string;
    descripcion?: string;
    imagenes_producto?: string;
    precio_producto?: number;
    precio_envio?: number;
    existencias?: number;
}

export type DataProductOptionals = Partial<DataProduct>;