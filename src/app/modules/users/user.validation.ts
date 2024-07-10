import {z} from 'zod'


const userValidationSchema = z.object({
    Password: z.string().optional(),
    isDeleted: z.boolean().default(false),
    status: z.string().default('in-progress')
})


export const userValidation = {
    userValidationSchema
}