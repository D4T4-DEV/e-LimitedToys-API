import { z } from 'zod';

export interface UserData {
    id_usuario?: string;
    nombres?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    psw_hash?: string;
    nick?: string;
    prof_pic?: string;
    calle?: string;
    colonia?: string;
    ciudad?: string;
    pais?: string;
    codigoPostal?: number;
    referencia?: string;
}

export const UserDataSchema = z.object({
    id_usuario: z.string().optional(),
    nombres: z.string(),
    apellidos: z.string(),
    email: z.string(),
    password: z.string(),
    nick: z.string(),
    prof_pic: z.string().optional(),
    calle: z.string(),
    colonia: z.string(),
    ciudad: z.string(),
    pais: z.string(),
    codigoPostal: z.number(),
    referencia: z.string().optional(),
});

export const LoginShema = UserDataSchema.pick({
    email: true,
    password: true,
});

export const User_ID_Schema = UserDataSchema.extend({id_usuario: z.string()});

export const EditAddressSchema = UserDataSchema.pick({
    calle: true,
    colonia: true,
    ciudad: true,
    pais: true,
    codigoPostal: true,
    referencia: true,
}).extend({id_usuario: z.string()});

export const EditNickNameSchema = UserDataSchema.pick({
    nick: true
}).extend({id_usuario: z.string()});;

export const EditPhotoProfileSchema = UserDataSchema.pick({
    prof_pic: true
}).extend({id_usuario: z.string()});;

export const DeletePhotoProfileSchema = UserDataSchema.pick({

}).extend({id_usuario: z.string()});