import { NextFunction, Request, Response } from 'express';
import { Respuesta } from '../Interfaces/ResponseInterface';
import * as Servicios from '../Services/productosServicio';

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
    const { indice_producto } = req.params;

    if (!indice_producto) {
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductos(indice_producto);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerProductoID = async (req: Request, res: Response, next: NextFunction) => {
    const { idProducto } = req.params;

    if (!idProducto) {
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos' });
        return;
    }

    try {
        const resultadoOperacion: Respuesta = await Servicios.ObtenerProductoID(idProducto);
        res.status(resultadoOperacion.status).json(resultadoOperacion)
    } catch (error) {
        // Pasamos el error al middleware de errores
        next(error);
    }
}

export const ObtenerProductosBuscador = async (req: Request, res: Response, next: NextFunction) => {
    const { indice, filter } = req.params;

    if (!indice || !filter) {
        res.status(400).json({ status: 400, message: 'No proporcionaste los datos necesarios' });
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