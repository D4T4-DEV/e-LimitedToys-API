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
    email: z.string().email(),
    password: z.string(),
    nick: z.string(),
    prof_pic: z.string().optional(),
    calle: z.string().optional(),
    colonia: z.string().optional(),
    ciudad: z.string().optional(),
    pais: z.string().optional(),
    codigoPostal: z.string().optional(),
    referencia: z.string().optional(),
});

export const CheckExistSchema = UserDataSchema.pick({
    email: true
});

export const LoginShema = UserDataSchema.pick({
    email: true,
    password: true,
});

export const User_ID_Schema = UserDataSchema.pick({
    id_usuario: true,
}).extend({
    id_usuario: z.string(),
});

export const EditAddressSchema = UserDataSchema.pick({
    id_usuario: true,
    calle: true,
    colonia: true,
    ciudad: true,
    pais: true,
    codigoPostal: true,
    referencia: true,
}).extend({id_usuario: z.string()});

export const EditNickNameSchema = UserDataSchema.pick({
    id_usuario: true,
    nick: true
}).extend({id_usuario: z.string()});

export const EditPhotoProfileSchema = UserDataSchema.pick({
    id_usuario: true,
    prof_pic: true
}).extend({id_usuario: z.string()});

export const DeletePhotoProfileSchema = UserDataSchema.pick({
    id_usuario: true,
}).extend({id_usuario: z.string()});