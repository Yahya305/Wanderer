import { hashPassword } from "@lib/utils/brcyptUtils";
import prisma from "@lib/utils/db";
import { z } from "zod";
import { signupSchema } from "../../app/api/authentication/signup/dto";
import { User } from "@prisma/client";

const userDtoFields: (keyof Omit<User, "password">)[] = [
    "email",
    "name",
    "id",
];

export const createUser = async (userData: z.infer<typeof signupSchema>) => {
    return await prisma.user.create({
        data: { ...userData, password: hashPassword(userData.password) },
    });
};

export const fetchUserById = async (
    id: string
): Promise<Omit<User, "password"> | null> => {
    
    return await prisma.user.findUnique({
        where: { id },
        select: userDtoFields.reduce((fields, field) => {
            fields[field] = true;
            return fields;
        }, {} as Record<keyof Omit<User, "password">, true>),
    });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};
