import { classicNameResolver } from "typescript";
import * as z from "zod";

export const createClassSchema = z.object({
    classname: z.string(),
})


export const addStudentSchema = z.object({
    studentId: z.string()
})
