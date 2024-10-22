import express from 'express';
import { Request, Response } from 'express';
const Router = express.Router();


// Respuesta que dara para saber el estado del servidor
Router.get('/ping', (_req: Request, res: Response) => {

    const RsponHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Estoy VIVO!</title>
        </head>
        <body>
            <h1> Status: 200 </h1>
            <img src= 'https://es.vidnoz.com/bimg/el-gato-bailando-gif-en-usagif.gif' alt="Gato bailando sabroso" />
        </body>
        </html>
    `;

    const RsponJSON = {
        status: 200,
        response: 'PONG',
        img: 'https://es.vidnoz.com/bimg/el-gato-bailando-gif-en-usagif.gif'
    }

    res.status(200).send(RsponJSON)
})

export default Router;

