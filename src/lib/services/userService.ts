import prisma from "@lib/db";
import { z } from "zod";
import { signupSchema } from "../../app/api/authentication/signup/dto";
import { checkPassword, hashPassword } from "@lib/brcyptUtils";
import { loginSchema } from "../../app/api/authentication/login/dto";
import { NextResponse } from "next/server";

export const createUser = async (userData: z.infer<typeof signupSchema>) => {
    await prisma.user.create({
        data: { ...userData, password: hashPassword(userData.password) },
    });
};

export const loginUser = async (userData: z.infer<typeof loginSchema>) => {
    const user = await prisma.user.findUnique({
        where: { email: userData.email },
    });
    if (!user) {
        return;
    }
    // if (!checkPassword(userData.password, user.password)) {
    //     return NextResponse.json({ status: 401, message: "Unauthorized" });
    // }
    const { password, ...userDto } = user;
    return userDto;
};
