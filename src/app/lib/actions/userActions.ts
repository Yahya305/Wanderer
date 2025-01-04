"use server";
import prisma from "@lib/utils/db";
import { cache } from "react";

export const createUser = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
};
export const fetchUser = async () => {
    const user = await prisma.user.findUnique({
        where: {
            email: "",
        },
    });
    return user;
};

export const fetchUsers = cache(async () => {
    const users = await prisma.user.findMany();

    return users;
});
