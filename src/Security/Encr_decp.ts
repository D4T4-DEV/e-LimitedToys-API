// ARCHIVO PARA LAS FUNCIONALIDADES DE LA INVOCACION EN LA RUTA
// ESTE CODIGO FUE PROPORCIONADO POR https://github.com/JoshuaEGonzalezRuiz
import crypto from 'crypto';

type JsonData = { [key: string]: any }; // -> Objeto JSON 
type EncryptedData = string; // -> Datos en string 

const { AES_PRIVATE_KEY } = process.env;

// Función para encriptar datos, recibe un JSON
export async function EncriptarDatos(JSON_DATA: JsonData): Promise<EncryptedData> {
    const TXT_DATA = JSON.stringify(JSON_DATA);

    // Se obtiene la clave privada AES de la variable de entorno y se convierte en buffer
    const keyHex = AES_PRIVATE_KEY;

    if (!keyHex) {
        throw new Error('La clave privada AES no está definida');
    }

    const key = Buffer.from(keyHex, 'hex');

    // Se genera un vector de inicialización aleatorio de 16 bytes
    const iv = crypto.randomBytes(16);

    // Se crea un cifrador usando el algoritmo AES-256-GCM, la clave y el IV
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    // Se encripta el texto en formato UTF-8 y se convierte a hexadecimal
    let encrypted = cipher.update(TXT_DATA, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Se devuelve el IV, la AuthTag y el texto encriptado, separados por ':'
    return iv.toString('hex') + ':' + cipher.getAuthTag().toString('hex') + ':' + encrypted;
}

// Función para descifrar datos encriptados, recibe un string con posibles datos con ":" (un JSON en formato string)
export async function DesencriptarDatos(STRING_DATA: EncryptedData): Promise<JsonData> {
    // Se obtiene la clave privada AES del entorno y se convierte en un buffer
    const keyHex = AES_PRIVATE_KEY;

    if (!keyHex) {
        throw new Error('La clave privada AES no está definida');
    }

    const key = Buffer.from(keyHex, 'hex');

    // Se divide el texto encriptado en partes: IV (vector de inicialización), AuthTag (etiqueta de autenticación) y texto encriptado
    const [ivHex, authTagHex, encryptedHex] = STRING_DATA.split(':');

    // Se convierte el IV en un buffer
    const iv = Buffer.from(ivHex, 'hex');

    // Se convierte la AuthTag en un buffer
    const authTag = Buffer.from(authTagHex, 'hex');

    // Se crea un descifrador usando el algoritmo AES-256-GCM, la clave y el IV
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    // Se establece la AuthTag para verificar la autenticidad del mensaje
    decipher.setAuthTag(authTag);

    // Se descifra el texto encriptado y se convierte a formato UTF-8
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Se devuelve el texto descifrado
    return JSON.parse(decrypted);
}