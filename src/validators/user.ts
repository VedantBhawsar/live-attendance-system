import * as z from 'zod'; 

export const createUserSchema = z.object({
    name: z.string(), 
    email: z.email(),
    password: z.string().min(6, "minium length should be 6"), 
    role: z.enum(['teacher', 'student']) 
}) 


export const loginUserSchema = z.object({
    email: z.string(), 
    password: z.string().min(6, "minimum length should be 6")
})

