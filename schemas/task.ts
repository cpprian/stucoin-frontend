import * as z from "zod";

export const TaskSchema = z.object({
    Title: z.string(),
    Description: z.string(),
    CoverImage: z.optional(z.string()),
    Points: z.number(),
    Completed: z.enum(["COMPLETED", "INCOMPLETED", "ABORTED", "ACCEPTED", "OPEN"]),
    Owner: z.string(),
    InCharge: z.optional(z.string()),
    Files: z.optional(z.array(z.string())),
    Images: z.optional(z.array(z.string())),
    Tags: z.array(z.string()),
})

// extend the schema to include the id
export const TaskSchemaId = TaskSchema.extend({
    ID: z.string(),
});

export type Task = z.infer<typeof TaskSchemaId>;