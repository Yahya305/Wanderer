import { z } from "zod";
import { signupSchema } from "../../app/api/authentication/signup/dto";
import { loginSchema } from "../../app/api/authentication/login/dto";
import { createUser, fetchUserById, findUserByEmail } from "@lib/data-access/user";
import { checkPassword } from "@lib/utils/brcyptUtils";
import { LoginError, PublicError } from "@lib/utils/errors";
import { createSession, invalidateSession } from "@lib/utils/session";

export const registerUser = async (userData: z.infer<typeof signupSchema>) => {
    // TODO - check if user already exists

    return await createUser(userData);
};

export const fetchUserByIdUseCase=async(id:string)=>{
    return await fetchUserById(id);
}

export const loginUserUseCase = async (userData: z.infer<typeof loginSchema>) => {
    const user = await findUserByEmail(userData.email);
    if (!user) {
        return;
    }
    // if (!checkPassword(userData.password, user.password)) {
    //     // await invalidateSession();
    //     throw new LoginError(); 
    // }
    await createSession(user.id);
    
    const { password, ...userDto } = user;
    return userDto;
};
