import bcrypt from 'bcryptjs';
export const cifrar =(password:string)=>{
    return bcrypt.hashSync(password);   

}