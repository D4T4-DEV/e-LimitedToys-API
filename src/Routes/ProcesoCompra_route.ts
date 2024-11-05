import express from 'express';
import * as Controllers from '../Controllers/procesoCompraController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

const router = express.Router();

router.post('/buy', verifyTokenMiddleware, Controllers.GenerarCompra);

export default router;