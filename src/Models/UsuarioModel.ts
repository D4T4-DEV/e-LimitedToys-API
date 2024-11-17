import path from "path";
import fs from 'fs';
import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";
import { UserData } from "../Interfaces/UsuarioInterface";
// import { EncriptarDatos } from "../Security/Encr_decp";
import { CifrarContrasenia, CompararContrasenias } from "../Security/Pwd_process";
import { GenerarToken } from "../Security/Tokens";

const { PORT_SERVER, URL, TYPE_CONN } = process.env;
const PORT = PORT_SERVER || 3002;
const URL_API = URL || 'localhost';
const PROTOCOL = TYPE_CONN || 'http';


const baseURL = `${PROTOCOL}://${URL_API}:${PORT}`;

export const RegistrarUsuario = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        nombres,
        apellidos,
        email,
        password, // Contraseña plana o hasheada
        nick,
        prof_pic,
        calle,
        referencia,
        pais,
        ciudad,
        colonia,
        codigoPostal
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        const pwd_hash = await CifrarContrasenia(password!);

        // Consulta por el procedimiento almacenado
        const [result] = await conn_MYSQL.query(
            `CALL InsertarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @mensaje);`, [
            nombres,
            apellidos,
            email,
            pwd_hash,
            nick,
            prof_pic,
            calle,
            referencia,
            pais,
            ciudad,
            colonia,
            codigoPostal
        ]);

        // Obtencion del mensaje generado por el proceso
        const [mensajeResult]: any[] = await conn_MYSQL.query(`
            SELECT @mensaje AS mensaje;
        `);

        const mensaje: string = mensajeResult[0]?.mensaje;
        if (mensaje !== 'El usuario existe') {
            return { status: 200, message: 'Se creo correctamente el usuario' };
        }
        return { status: 400, message: 'El email ya esta registrado' };

    } catch (error) {
        const customError = new Error(`RegistrarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const IniciarSesion = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        email,
        password, // Contraseña plana o hasheada
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        // Consulta por el procedimiento almacenado
        const [result]: any[] = await conn_MYSQL.query(`CALL IniciarSesion( ?, @mensaje)`, [email]);

        // Obtencion del mensaje generado por el proceso
        const [mensajeResult]: any[] = await conn_MYSQL.query(`
            SELECT @mensaje AS mensaje;
        `);

        const mensaje: string = mensajeResult[0]?.mensaje;

        if (mensaje === 'Usuario no encontrado') {
            return { status: 404, message: 'No se encontro usuario' };
        }

        if (mensaje === 'El usuario pauso su cuenta, contacte a soporte') {
            return { status: 409, message: 'El usuario pauso su cuenta, contacte a soporte' };
        }

        if (result.length > 0) {
            const usuario: UserData = result[0][0]; // Tomamos el resultado

            // Obtenemos los datos que viene del usuario (consulta mysql)
            const { id_usuario, nick, prof_pic, psw_hash } = usuario;

            const rsulCompare = await CompararContrasenias(password!, psw_hash!);
            if (rsulCompare) {

                // Generamos su token
                const token = GenerarToken({ id: id_usuario, email: email });

                // Encriptamos los datos antes usado para enviar datos encriptados y el cliente los desencripte y use
                // const dataEncriptada = await EncriptarDatos({
                //     id_usuario: id_usuario,
                //     nick: nick,
                //     url_prof_pic: `${baseURL}/${(prof_pic)}`,
                //     token: token
                // });

                return {
                    status: 200, message: 'Devolviendo datos, para que se inicie sesion', data: { 
                        id_usuario: id_usuario,
                        nick: nick,
                        url_prof_pic: `${baseURL}/${(prof_pic)}`,
                        token: token
                     }
                };

            } else {
                return { status: 401, message: 'Correo o contraseña incorrectos' }
            }
        }

        return { status: 500, message: 'No ocurrio nada, valida la solicitud' };

    } catch (error) {
        const customError = new Error(`IniciarSesion() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EditarDireccion = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        calle,
        referencia,
        pais,
        ciudad,
        colonia,
        codigoPostal
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[] = await conn_MYSQL.query(`
            CALL ModificarDireccion(?, ?, ?, ?, ?, ?, ?, @mensaje );
        `, [id_usuario, calle, referencia, pais, ciudad, colonia, codigoPostal]);

        const [mensajeResult]: any[] = await conn_MYSQL.query(`
            SELECT @mensaje AS mensaje;
        `);

        const msg: string = mensajeResult[0].mensaje;

        if (msg != 'Se modifico la direccion') {
            return { status: 404, message: mensajeResult };
        }
        return { status: 200, message: `Modifique la direccion` };

    } catch (error) {
        const customError = new Error(`EditarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EditarNick = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        nick
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[] = await conn_MYSQL.query(`
            UPDATE Usuarios SET nick = (?) WHERE id_usuario = (?);
        `, [nick, id_usuario]);

        return { status: 200, message: `Modifique el nickname del usuario` };

    } catch (error) {
        const customError = new Error(`EditarNick() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EditarFotoPerfil = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        id_usuario,
        prof_pic
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [relativePathAnt]: any[] = await conn_MYSQL.query(`SELECT prof_pic FROM Usuarios WHERE id_usuario = (?)`, [id_usuario]);
        const rutaImagen = relativePathAnt[0].prof_pic;
        const nombreImagen = path.basename(rutaImagen);

        if (!rutaImagen) {
            const [result]: any[] = await conn_MYSQL.query(`
                UPDATE Usuarios SET prof_pic = (?) WHERE id_usuario = (?);
            `, [prof_pic, id_usuario]);

            if (result.affectedRows === 0) {
                return { status: 500, message: 'No se subio la imagen, porfavor intentelo mas tarde' };
            }
        } else {
            const [result]: any[] = await conn_MYSQL.query(`
                UPDATE Usuarios SET prof_pic = (?) WHERE id_usuario = (?);
            `, [prof_pic, id_usuario]);

            if (result.affectedRows === 0) {
                return { status: 500, message: 'No se subio la imagen, porfavor intentelo mas tarde' };
            }
            
            // ASPECTO PARA ELIMINAR LA IMAGEN DEL DIRECTORIO
            const imagePath = path.join(__dirname, `../../${rutaImagen}`);

            // Verifica si la imagen existe antes de eliminarla
            try {
                await fs.promises.access(imagePath, fs.constants.F_OK);

                // Elimina la imagen del servidor
                await fs.promises.unlink(imagePath);
                return { status: 200, message: `Se eliminó correctamente ${nombreImagen}` };
            } catch (err) {
                console.error(`Error al eliminar la imagen ${nombreImagen}:`, err);
                return { status: 500, message: `Surgió un error al tratar de eliminar ${nombreImagen}` };
            }
        }

        return { status: 200, message: `Modifique la foto de perfil del usuario` };

    } catch (error) {
        const customError = new Error(`EditarFotoPerfil() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}


export const EliminarFotoPerfil = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const { id_usuario } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [relativePathAnt]: any[] = await conn_MYSQL.query(`SELECT prof_pic FROM Usuarios WHERE id_usuario = (?)`, [id_usuario]);
        const rutaImagen: string = relativePathAnt[0].prof_pic;
        const nombreImagen: string = path.basename(rutaImagen);

        const [result]: any[] = await conn_MYSQL.query(`
            UPDATE Usuarios SET prof_pic = NULL WHERE id_usuario = (?);
        `, [id_usuario]);

        if (result.affectedRows === 0) {
            return { status: 500, message: 'No se elimino la imagen, porfavor intentelo mas tarde' };
        }
        
        // ASPECTO PARA ELIMINAR LA IMAGEN DEL DIRECTORIO
        const imagePath = path.join(__dirname, `../../${rutaImagen}`);

        // Verifica si la imagen existe antes de eliminarla
        try {
            await fs.promises.access(imagePath, fs.constants.F_OK);

            // Elimina la imagen del servidor
            await fs.promises.unlink(imagePath);
            return { status: 200, message: `Se eliminó correctamente ${nombreImagen}` };
        } catch (err) {
            console.error(`Error al eliminar la imagen ${nombreImagen}:`, err);
            return { status: 500, message: `Surgió un error al tratar de eliminar ${nombreImagen}` };
        }

    } catch (error) {
        const customError = new Error(`EliminarFotoPerfil() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}


export const EliminarUsuario = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const { id_usuario } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        // Consulta por el procedimiento almacenado
        const [result] = await conn_MYSQL.query(`CALL BorrarCuentaUsuario(?, @mensaje);`, [id_usuario]);

        // Obtencion del mensaje generado por el proceso
        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);

        const mensaje: string = mensajeResult[0]?.mensaje;

        if (mensaje !== 'El usuario no existe') {
            return { status: 200, message: 'Se pauso el usuario' };
        }
        return { status: 400, message: 'El usuario no existe' };

    } catch (error) {
        const customError = new Error(`EliminarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const ObtenerDatosUsuario = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const { id_usuario } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        const [result]: any[] = await conn_MYSQL.query(`CALL ObtenerDatosUsuario( ? )`, [id_usuario]);

        // Tomamos lo que viene de la consulta, o bien asignamos un arreglo vacio
        const userData = result[0] || [];

        if (userData.length > 0) {
            return { status: 200, message: 'Devolviendo datos', data: { userData } };
        }
        return { status: 404, message: 'El usuario dado, no existe' };

    } catch (error) {
        const customError = new Error(`ObtenerDatosUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const ObtenerImgUsuario = async (user_ID: string): Promise<string | undefined> => {
    const conn_MYSQL = await getConnectionMySQL();

    try {
        const [result]: any[] = await conn_MYSQL.query(`SELECT prof_pic FROM usuarios WHERE id_usuario = ?`, [user_ID]);

        // Verificamos si la respuesta no esta vacia y contenga el campo esperado
        if (result.length > 0 && result[0].prof_pic) {
            return result[0].prof_pic;
        }

        // Si no hay resultado dada la condicion, o no se tiene el campo esperado
        return undefined;

    } catch (error) {
        const customError = new Error(`ObtenerImgUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}