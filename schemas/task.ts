import * as z from "zod";

export const TaskSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters",
    }),
    coverImage: z.optional(z.string()),
    points: z.number().min(0, {
        message: "Points must be a positive number",
    }),
    completed: z.enum(["COMPLETED", "INCOMPLETED", "ABORTED"]),
    owner: z.string(),
    inCharge: z.optional(z.string()),
    files: z.optional(z.array(z.string())),
    images: z.optional(z.array(z.string())),
    tags: z.array(z.string()).min(1, {
        message: "You must have at least one tag",
    }),
})