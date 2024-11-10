import express from 'express';
import * as Controllers from '../Controllers/carritoController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

const router = express.Router();

router.post('/add', verifyTokenMiddleware, Controllers.AniadirProductoCarrito);
router.put('/edit', verifyTokenMiddleware, Controllers.EditarProductoCarrito);
router.delete('/delete/:id_usuario/:id_producto', verifyTokenMiddleware,  Controllers.EliminarProductoCarrito);
router.get('/get/:id_usuario', verifyTokenMiddleware, Controllers.ObtenerCarrito);

export default router;