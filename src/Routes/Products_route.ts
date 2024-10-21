import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/productosController';

const router = express.Router();

router.post('/new', proccessDecryptDataMiddleware, Controllers.AniadirProducto);
router.put('/edit', proccessDecryptDataMiddleware, Controllers.EditarProducto);
router.delete('/delete', proccessDecryptDataMiddleware, Controllers.EliminarProducto);

router.get('/get/:indice_producto',  Controllers.ObtenerProductos)

export default router;