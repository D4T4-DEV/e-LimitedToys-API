import bcrypt from 'bcryptjs';
const { PASSWORD_SALT_ROUNDS } = process.env;


export const CompararContrasenias = async (pwd_plana: string, psw_hash: string) => {
    const isMatch = await bcrypt.compare(pwd_plana, psw_hash);
    return isMatch;
}

export const CifrarContrasenia = async (pwd_plana: string) => {
    const psw_hash = await bcrypt.hash(pwd_plana, Number(PASSWORD_SALT_ROUNDS));
    return psw_hash;
}