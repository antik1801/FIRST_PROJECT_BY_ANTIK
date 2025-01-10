import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringSchema = z.string().refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
      return regex.test(time);
    },
    {
      message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
  );


const createOfferedCourseValidationSchema = z.object({
    body: z.object({
    semesterRegistration: z.string({required_error: "semesterRegistration is required"}),
    academicDepartment: z.string({required_error: "academicDepartment is required"}),
    academicFaculty: z.string({required_error: "academicFaculty is required"}),
    academicSemester: z.string({required_error: "academicSemester is required"}),
    course: z.string({required_error: "course is required"}),
    faculty: z.string({required_error: "faculty is required"}),
    maxCapacity: z.number({required_error: "maxCapacity is required"}),
    days: z.enum([...Days] as [string, ...string[]]),
    section: z.number(),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    isDeleted: z.boolean().optional().default(false)    
    }).refine((body) =>{
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start
    },{
        message: "End time must be bigger than start time"
    })
})

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string({required_error: "semesterRegistration is required"}).optional(),
        academicDepartment: z.string({required_error: "academicDepartment is required"}).optional(),
        academicFaculty: z.string({required_error: "academicFaculty is required"}).optional(),
        academicSemester: z.string({required_error: "academicSemester is required"}).optional(),
        course: z.string({required_error: "course is required"}).optional(),
        faculty: z.string({required_error: "faculty is required"}).optional(),
        maxCapacity: z.number({required_error: "maxCapacity is required"}).optional(),
        days: z.enum([...Days] as [string, ...string[]]).optional(),
        section: z.number().optional(),
        startTime: timeStringSchema.optional(),
        endTime: timeStringSchema.optional(),
        isDeleted: z.boolean().optional().default(false)    
        }).refine((body) =>{
            const start = new Date(`1970-01-01T${body.startTime}:00`);
            const end = new Date(`1970-01-01T${body.endTime}:00`);
    
            return end > start
        },{
            message: "End time must be bigger than start time"
        })
})

export const offeredCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}