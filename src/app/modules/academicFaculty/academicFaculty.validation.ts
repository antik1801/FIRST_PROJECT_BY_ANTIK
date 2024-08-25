import {z} from "zod"

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error:"Name must be a string"}),
        isDeleted: z.boolean().default(false)
    })
})
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error:"Name must be a string"}).optional()
    })
})


export const academicFacultyValidation = {createAcademicFacultyValidationSchema,updateAcademicFacultyValidationSchema}

