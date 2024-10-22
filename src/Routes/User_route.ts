import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
const router = express.Router();
import * as Controllers from '../Controllers/usuarioController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

router.post('/register', proccessDecryptDataMiddleware, Controllers.RegistrarUsuario);
router.get('/login', proccessDecryptDataMiddleware, Controllers.IniciarSesion);
router.delete('/delete/:user_ID', verifyTokenMiddleware, Controllers.EliminarUsuario);


router.put('/edit-direccion', verifyTokenMiddleware, Controllers.EditarDireccion);
router.put('/edit-photo', verifyTokenMiddleware, );
router.put('/edit-nick', verifyTokenMiddleware, );


export default router;