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
    👆 Hasta aqui llegan las posibles implementaciones (aplica para sus servicios y controladores)
*/

router.get('/get/:indice_producto',  Controllers.ObtenerProductos);
router.get('/get-for-id/:idProducto',  Controllers.ObtenerProductoID);
router.get('/get/search/:indice/:filter',  Controllers.ObtenerProductosBuscador);

export default router;