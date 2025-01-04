"use server";

import {
    authenticatedAction,
    unauthenticatedAction,
} from "@lib/utils/safe-action";
import { loginUserUseCase } from "@lib/use-cases/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const loginUserAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            email: z
                .string()
                .email("Please enter a valid email")
                .min(2, "Email must be at least 2 characters")
                .max(50, "Email must be less than 50 characters"),
            password: z
                .string()
                .min(6, "Password must be at least 6 characters")
                .max(50, "Password must be less than 50 characters"),
        })
    )
    .handler(async ({ input, ctx }) => {
        const user = await loginUserUseCase({
            email: input.email,
            password: input.password,
        });
        return user;
    });
