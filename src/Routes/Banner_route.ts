import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/bannerController';

const router = express.Router();

router.get('/get', Controllers.ObtenerBanners);
router.post('/upload', proccessDecryptDataMiddleware, Controllers.SubirBanner);
router.delete('/delete/:id_banner', Controllers.BorrarBanner);


export default router;