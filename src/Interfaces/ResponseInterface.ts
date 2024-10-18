type JsonData = { [key: string]: any }; // -> Objeto JSON 


export interface Respuesta {
    status: number;
    message: string;
    data?: JsonData
}


export interface RespuestaConDatos extends Respuesta {
    data: JsonData
}