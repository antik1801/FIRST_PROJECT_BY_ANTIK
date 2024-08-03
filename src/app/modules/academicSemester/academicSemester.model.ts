import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCodes, academicSemesterNames, months } from "./academicSemester.constant";





const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: academicSemesterNames,
            required: true,
        },
        code: {
            type: String,
            enum: academicSemesterCodes,
            required: true
        },
        year: {
            type: String,
            required: true,
        },
        startMonth:{
            type: String,
            enum: months,
            required: true,
        },
        endMonth:
        {
            type: String,
            enum: months,
            required: true
        }
    },
    {
        timestamps: true
    }
)


academicSemesterSchema.pre("save",async function (){
    const isAcademicSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })
    if(isAcademicSemesterExists)
    {
        throw new Error("This academic semester is already existed")
    }
})


export const AcademicSemester =  model<TAcademicSemester>('Academic-Semester', academicSemesterSchema);