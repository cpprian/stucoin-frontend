import { Role } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters",
    }),
    surname: z.string().min(2, {
        message: "Surname must be at least 2 characters",
    }),
    role: z.enum([Role.STUDENT, Role.TEACHER]),
})