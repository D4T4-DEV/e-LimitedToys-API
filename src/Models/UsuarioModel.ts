import { getConnectionMySQL } from "../DataBase/connector";
import { Respuesta } from "../Interfaces/ResponseInterface";
import { UserData } from "../Interfaces/UsuarioInterface";
import { EncriptarDatos } from "../Security/Encr_decp";
import { CifrarContrasenia, CompararContrasenias } from "../Security/Pwd_process";
import { GenerarToken } from "../Security/Tokens";


export const RegistrarUsuario = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const {
        nombres,
        apellidos,
        email,
        password, // Contraseña plana o hasheada
        nickname,
        imagenPerfil,
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
            nickname,
            imagenPerfil,
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

        const mensaje = mensajeResult[0]?.mensaje;
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

        const mensaje = mensajeResult[0]?.mensaje;

        if (mensaje === 'Usuario no encontrado') {
            return { status: 404, message: 'No se encontro usuario' };
        }

        if (mensaje === 'El usuario pauso su cuenta, contacte a soporte') {
            return { status: 409, message: 'El usuario pauso su cuenta, contacte a soporte' };
        }

        if (result.length > 0) {
            const usuario = result[0][0]; // Tomamos el resultado

            // Obtenemos los datos que viene del usuario (consulta mysql)
            const { id_usuario, nick, prof_pic, psw_hash } = usuario;

            const rsulCompare = await CompararContrasenias(password!, psw_hash);
            if (rsulCompare) {

                // Generamos su token
                const token = GenerarToken({ id: id_usuario, email: email });

                // Encriptamos los datos
                const dataEncriptada = EncriptarDatos({
                    id_usuario: id_usuario,
                    nick: nick,
                    prof_pic: prof_pic,
                    token: token
                });

                return {
                    status: 200, message: 'Devolviendo datos, para que se inicie sesion', data: { dataEncriptada }
                };

            } else {
                return { status: 401, message: 'Datos incorrectos, verificar' }
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
        nombres,
        apellidos,
        email,
        password, // Contraseña plana o hasheada
        nickname,
        imagenPerfil,
        calle,
        referencia,
        pais,
        ciudad,
        colonia,
        codigoPostal
    } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {
        return { status: 200, message: 'Se edito correctamente el usuario' };
    } catch (error) {
        const customError = new Error(`EditarUsuario() modelo ${error}`);
        (customError as any).statusCode = 500;
        throw customError;
    } finally {
        conn_MYSQL.release();
    }
}

export const EliminarUsuario = async (data: UserData): Promise<Respuesta> => {
    // Obtencion de las variables de la interfaz
    const { user_ID } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        // Consulta por el procedimiento almacenado
        const [result] = await conn_MYSQL.query(`CALL BorrarCuentaUsuario(?, @mensaje);`, [user_ID]);

        // Obtencion del mensaje generado por el proceso
        const [mensajeResult]: any[] = await conn_MYSQL.query(`SELECT @mensaje AS mensaje;`);

        const mensaje = mensajeResult[0]?.mensaje;

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
    const { user_ID } = data;

    const conn_MYSQL = await getConnectionMySQL();

    try {

        const [result]: any = await conn_MYSQL.query(`CALL ObtenerDatosUsuario( ? )`, [user_ID]);

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
        const [result]: any = await conn_MYSQL.query(`SELECT prof_pic FROM usuarios WHERE id_usuario = ?`, [user_ID]);

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