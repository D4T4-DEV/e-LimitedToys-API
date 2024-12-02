import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
const router = express.Router();
import * as Controllers from '../Controllers/usuarioController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';

router.post('/register', proccessDecryptDataMiddleware, Controllers.RegistrarUsuario);
router.post('/login', proccessDecryptDataMiddleware, Controllers.IniciarSesion);
router.delete('/delete/:id_usuario', verifyTokenMiddleware, Controllers.EliminarUsuario);
router.get('/obtener-datos/:id_usuario', verifyTokenMiddleware, Controllers.ObtenerDatosUsuario)


router.get('/check-exist/:emailDecript', Controllers.ChecarExistenciaEmail);
router.put('/edit-direccion', verifyTokenMiddleware, Controllers.EditarDireccion);
router.put('/edit-photo', verifyTokenMiddleware, Controllers.EditarFotoPerfil);
router.delete('/delete-photo', verifyTokenMiddleware, Controllers.EliminarFotoPerfil);
router.put('/edit-nick', verifyTokenMiddleware, Controllers.EditarNick);

export default router;