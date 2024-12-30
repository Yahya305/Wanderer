import * as bcrypt from 'bcryptjs';

export const hashPassword = (rawPassword: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(rawPassword, salt);
};

export const checkPassword=(enteredPassword:string,hashedPwd:string)=>{
    return bcrypt.compareSync(enteredPassword,hashedPwd)
}