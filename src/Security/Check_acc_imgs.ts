import path from "path";
import { ObtenerImgUsuario } from "../Models/UsuarioModel";

export async function verificarAccesoImgProfile(user_ID: string, requestedFile: string): Promise<boolean> {

    // Consultamos el path relativo de la imagen, para devolverla
    const relativePath = await ObtenerImgUsuario(user_ID);

    // Juntamos el path relativo existente en la base de datos
    const userDirectory = path.join(__dirname, `../../${relativePath}`);

    // Verifica si el archivo solicitado está dentro de la carpeta del usuario
    return requestedFile.startsWith(path.normalize(userDirectory));
}