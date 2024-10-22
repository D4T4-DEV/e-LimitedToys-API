export interface DataProduct {
    id_Product?: string;
    nombreProducto: string;
    categoria: string;
    marca: string;
    descripcion: string;
    imagenesProducto: string[];
    precio: number;
    precioEnvio: number;
    existencias: number;
}

export type DataProductOptionals = Partial<DataProduct>;