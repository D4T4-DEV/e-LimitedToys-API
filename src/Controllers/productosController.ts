import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/productosServicio';
import { GetProductForIDSchema, GetProductsForFilter, GetProductsForIndex } from '../Interfaces/ProductoInterface';

/*
    Posibles implementaciones
*/

/*
export const AniadirProducto = async (req: Request, res: Response, next: NextFunction) => {

    const Datos = JSON.parse(req.body.datos);

    if(!Datos){
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.AniadirProducto(Datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EditarProducto = async (req: Request, res: Response, next: NextFunction) => {
    const Datos = JSON.parse(req.body.datos);

    if(!Datos){
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EditarProducto(Datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const EliminarProducto = async (req: Request, res: Response, next: NextFunction) => {

    const Datos = JSON.parse(req.body.datos);

    if(!Datos){
        res.status(400).json({ status: 400, message: 'No proporcionaste ningun dato' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.EliminarProducto(Datos);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios, controladores y modelos)
*/

export const ObtenerProductos = async (req: Request, res: Response, next: NextFunction) => {
    // const resultValidateData = GetProductsForIndex.safeParse(req.params);
    // if (!resultValidateData.success) {
    //     res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
    //     return;
    // }
    // const { indice } = req.params;

    // // Verificar si id_product es un numero
    // if (!Number.isFinite(Number(indice))) {
    //     res.status(400).json({ status: 400, message: 'El indice de paginado debe ser un número válido' });
    //     return;
    // }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductos();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerProductosDestacados = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductosDestacados();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerProductoID = async (req: Request, res: Response, next: NextFunction) => {
    // Validacion de datos por ZOD
    const resultValidateData = GetProductForIDSchema.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }
    const { id_product } = req.params;

    // Verificar si id_product es un numero
    if (!Number.isFinite(Number(id_product))) {
        res.status(400).json({ status: 400, message: 'El ID de producto debe ser un número válido' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductoID(id_product);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerProductosBuscador = async (req: Request, res: Response, next: NextFunction) => {
    // Validacion de datos por ZOD
    const resultValidateData = GetProductsForFilter.safeParse(req.params);
    if (!resultValidateData.success) {
        res.status(400).json({ status: 400, message: 'No se enviaron los datos necesarios para la operación' });
        return;
    }

    const { indice, filter } = req.params;

    // Verificar si id_product es un numero
    if (!Number.isFinite(Number(indice))) {
        res.status(400).json({ status: 400, message: 'El indice de paginado debe ser un número válido' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductosBuscador(indice, filter);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerMarcasYPrecios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerMarcasYPrecios();
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}
