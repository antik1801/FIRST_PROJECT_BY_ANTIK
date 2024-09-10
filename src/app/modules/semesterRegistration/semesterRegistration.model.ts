import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { Status } from "./semesterRegistration.constant";


const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: [true, "academicSemester is required"]
    },
    status:{
        type: String,
        enum: {
            values: Status,
            message: "{VALUE} is not a valid status"
        },
    },
    startDate: {
        type: Date,
        required: [true, "startDate is required"]
    },
    endDate: {
        type: Date,
        required: [true, "endDate is required"]
    },
    minCredit: {
        type: Number,
        required: [true, "minCredit is required"]
    },
    maxCredit:{
        type: Number,
        required: [true, "maxCredit is required"]
    }
},
{
    timestamps: true
})


export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);