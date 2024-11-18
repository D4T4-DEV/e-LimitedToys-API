import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/productosController';

const router = express.Router();


/*
    Posibles implementaciones
*/

// router.post('/new', proccessDecryptDataMiddleware, Controllers.AniadirProducto);
// router.put('/edit', proccessDecryptDataMiddleware, Controllers.EditarProducto);
// router.delete('/delete', proccessDecryptDataMiddleware, Controllers.EliminarProducto);

/*
    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios, controladores y modelos)
*/

router.get('/get/',  Controllers.ObtenerProductos);
router.get('/get-featured', Controllers.ObtenerProductosDestacados);
router.get('/get-for-id/:id_product',  Controllers.ObtenerProductoID);
router.get('/get/search/:indice/:filter',  Controllers.ObtenerProductosBuscador);

export default router;