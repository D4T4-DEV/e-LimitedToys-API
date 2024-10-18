import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
const router = express.Router();
import * as Controllers from '../Controllers/usuarioController';

router.post('/new', proccessDecryptDataMiddleware, Controllers.RegistrarUsuario);
router.put('/edit', Controllers.EditarUsuario);
router.put('/delete', Controllers.EliminarUsuario);


export default router;