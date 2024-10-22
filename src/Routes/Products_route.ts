import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/productosController';

const router = express.Router();

router.post('/new', proccessDecryptDataMiddleware, Controllers.AniadirProducto);
router.put('/edit', proccessDecryptDataMiddleware, Controllers.EditarProducto);
router.delete('/delete', proccessDecryptDataMiddleware, Controllers.EliminarProducto);

router.get('/get/:indice_producto',  Controllers.ObtenerProductos);
router.get('/get/search/:indice/:filter',  Controllers.ObtenerProductosBuscador);

export default router;