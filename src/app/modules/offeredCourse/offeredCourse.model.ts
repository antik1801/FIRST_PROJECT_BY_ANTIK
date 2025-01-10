import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constant";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { RegistrationStatus } from "../semesterRegistration/semesterRegistration.constant";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";




const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration:{
        type: Schema.Types.ObjectId,
        ref: "SemesterRegistration",
        required: [true, "semesterRegistration is required"]
    },
    academicDepartment:{
        type: Schema.Types.ObjectId,
        ref: "AcademicDepartment",
        required: [true, "academicDepartment is required"]
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: [true, "academicFaculty is required"]
    },
    academicSemester:{
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: [true, "academicSemester is required"]
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "course is required"]
    },
    faculty:{
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: [true, "faculty is required"]
    },
    maxCapacity: {
        type: Number,
        required: [true, "maxCapacity is required"]
    },
    days:[
        {
            type: String,
            enum: Days
        }
    ],
    section:{
        type: Number,
        required: [true, "section is required"]
    },
    startTime:{
        type: String,
        required: [true, "startTime is required"]
    },
    endTime:{
        type: String,
        required: [true, "endTime is required"]
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

offeredCourseSchema.pre("save", async function (next){
    const isSemesterRegistrationExists = await SemesterRegistration.findById(this.semesterRegistration);
    if(!isSemesterRegistrationExists)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "This semester registration is not exists");
    }
    if(isSemesterRegistrationExists.status === RegistrationStatus.ENDED)
    {
        throw new AppError(httpStatus.BAD_REQUEST, "This semester registration is already ended")
    }
    const isAcademicDepartmentExists = await AcademicDepartment.findById(this.academicDepartment);
    if(!isAcademicDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND, "This academic department is not exists")
    }
    // academicFaculty does not need to be check it is checked by academicDepartment 
    // academicSemester does not need to be check it is checked by semesterRegistration
    const isFacultyExists = await Faculty.findById(this.faculty);
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, "This faculty does not exist")
    }

    
    
    next();
})

export const OfferedCourse = model<TOfferedCourse>("OfferedCourse", offeredCourseSchema);