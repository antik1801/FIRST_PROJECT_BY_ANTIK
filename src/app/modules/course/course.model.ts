import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "CourseId is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    code: {
        type: Number,
        required: [true, "Code is required"]
    },
    credits: {
        type: Number,
        required: [true, "Credits is required"]
    },
    prefix: {
        type: String,
        required: [true, "Prefix is required"]
    },
    preRequisiteCourses: {
        type: [preRequisiteCoursesSchema],
        required: [true, "Pre Requisite courses is required"]
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
   
    timestamps: true
})



export const Course = model<TCourse>('Course', courseSchema);