import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
const router = express.Router();
import * as Controllers from '../Controllers/usuarioController';
import { verifyTokenMiddleware } from '../Middlewares/Verify_token';
import upload from '../Multer/Configuracion_multer';

router.post('/register', proccessDecryptDataMiddleware, Controllers.RegistrarUsuario);
router.get('/login', proccessDecryptDataMiddleware, Controllers.IniciarSesion);
router.delete('/delete/:user_ID', verifyTokenMiddleware, Controllers.EliminarUsuario);
router.get('/obtener-datos/:user_ID', verifyTokenMiddleware, Controllers.ObtenerDatosUsuario)


router.post('/upload-img', upload.single('imagen'), Controllers.SubirImagen);

router.put('/edit-direccion', verifyTokenMiddleware, Controllers.EditarDireccion);
router.put('/edit-photo', verifyTokenMiddleware, );
router.put('/edit-nick', verifyTokenMiddleware, );


export default router;