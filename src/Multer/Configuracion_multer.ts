import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const { DIR_UPLOAD } = process.env;
const MAX_FILE_SIZE: number = 10 * 1024 * 1024; // 10MB
const TiposAceptados = /jpeg|jpg|png|webp|gif/; // Tipos de archivos aceptados


// Filtro aplicado para operar antes de guardar o realizar acciones
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    try {
        const { typePath, otherPath } = req.body;

        if (!typePath || !otherPath) {
            cb(new Error('No se enviaron los datos correspondientes')); // Rechazar el archivo
        }

        const path = typePath === "1" ? `Public/${otherPath}` : `Private/${otherPath}`;
        req.body.path = path;

    } catch (err) {
        throw err;
    }

    // Verificar el tamaño del archivo antes de procesarlo
    if (file.size > MAX_FILE_SIZE) {
        cb(new Error('Solo se permiten archivos de maximo 10MB'));
    }

    // test verifica si se cumple un patron dado un regex (TiposAceptados) y si cumple devuelve TRUE
    // extname Devuelve la extensión de la ruta, desde el último '.' hasta el final de la cadena en la última parte del camino. Si no hay '.' en la última parte de la ruta o el primer carácter es '.', luego devuelve una cadena vacía.
    const extensionArchivo = TiposAceptados.test(path.extname(file.originalname).toLowerCase()); // Verifica la extension del archivo
    const tipoMIME = TiposAceptados.test(file.mimetype); // Verifica el tipo MIME https://developer.mozilla.org/es/docs/Web/HTTP/MIME_types

    if (extensionArchivo && tipoMIME) {
        return cb(null, true); // Aceptar el archivo si cumple con lo descrito arriba
    } else {
        cb(new Error('Solo se permiten archivos de imagen (JPEG, JPG, PNG, WEBP, GIF)')); // Rechazar el archivo
    }
};

// Configuracion de multer en modo guardado de archivos en disco (directorio)
const storage = multer.diskStorage({
    destination: (req, _file, cb) => {

        // Obtencion de la subcarpeta por el body

        const subcarpeta = req.body.path || 'default';
        const uploadPath = path.join(DIR_UPLOAD!, subcarpeta); // Directorio en donde se guardara uploads/${subcarpeta}

        // Si no existe el directorio lo crea (evita problemas de inexistencia de directorios)
        fs.mkdirSync(uploadPath, { recursive: true });

        // Decimos que no hubo error y que queremos meter el archivo en el destino creado
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {

        // Obtenemos su extension
        const extension = path.extname(file.originalname);

        // Generamos un identificador unico para que si existen dos imagenes iguales no se sobreescriban y le asignamos su extension
        const nombreUnico = `${uuidv4()}${extension}`;

        // Pasamos los datos del nombre del archivo generado
        cb(null, nombreUnico);
    }
});

// Inicializa Multer para usarse como middleware
const upload = multer({ fileFilter, storage });

export default upload;