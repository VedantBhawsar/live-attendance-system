import * as z from 'zod'


export const createAttendaanceSchema = z.object({
    classId: z.string(), 
    studentId: z.string(), 
    status: z.enum(["present", "absent"])
}) 



export const startAttendanceSchema = z.object({
    classId: z.string()
})