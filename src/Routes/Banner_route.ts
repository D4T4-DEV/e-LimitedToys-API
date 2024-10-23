import express from 'express';
import { proccessDecryptDataMiddleware } from '../Middlewares/Decripty_recive_data';
import * as Controllers from '../Controllers/bannerController';

const router = express.Router();

router.get('/get',  Controllers.ObtenerBanners);

export default router;