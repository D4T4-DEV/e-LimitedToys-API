import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
const router = express.Router();
import * as Controllers from '../Controllers/usuarioController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

router.post('/register', proccessDecryptDataMiddleware, Controllers.RegistrarUsuario);
router.get('/login', proccessDecryptDataMiddleware, Controllers.IniciarSesion);
router.put('/edit-direccion', verifyTokenMiddleware, Controllers.EditarUsuario);
router.delete('/delete/:user_ID', verifyTokenMiddleware, Controllers.EliminarUsuario);


export default router;