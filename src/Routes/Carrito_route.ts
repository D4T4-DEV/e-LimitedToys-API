import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/carritoController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

const router = express.Router();

router.post('/add', verifyTokenMiddleware, Controllers.AniadirProductoCarrito);
router.put('/edit', verifyTokenMiddleware, Controllers.EditarProductoCarrito);
router.delete('/delete/:userID/:productoID', verifyTokenMiddleware,  Controllers.EliminarProductoCarrito);
router.get('/get/:userID', verifyTokenMiddleware, Controllers.ObtenerCarrito);

export default router;