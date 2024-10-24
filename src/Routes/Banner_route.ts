import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/bannerController';
import upload from '../Multer/Configuracion_multer';
import path from 'path';

const router = express.Router();

router.get('/get', Controllers.ObtenerBanners);

                      //upload.single('imagen') -> Uso de multer como middlware que espera una key 'imagen'
router.post('/upload', upload.single('imagen'), Controllers.SubirBanner);

export default router;