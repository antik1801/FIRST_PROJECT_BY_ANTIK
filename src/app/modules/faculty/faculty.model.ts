import { Schema } from "mongoose";
import { TFaculty, TName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema <TName>({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    }
})


const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, "Faculty Id is required"],
            unique: true
        },
        user:{
            type: Schema.Types.ObjectId,
            required: [true, "user (objectid) is required"],
            unique: true,
            ref: 'User'
        },
        designation:{
            type: String,
            required: [true, "Designation is required"]
        },
        name: {
            type: userNameSchema,
            required: [true, "Name is required"]
        },
        gender: {
            type: String,
            enum: {
                values: Gender,
                message: "{VALUE} is not a valid gender , [male, female, others]"
            },
            required: [true, "Gender is required"]
        },
        bloodGroup:{
            type: String,
            enum: {
                values: BloodGroup,
                message: "{VALUE} is not a valid blood group" 
            },
        },
        dateOfBirth:{
            type: Date
        },
        email:{
            type: String,
            required : [true, "Email is required"]
        },
        academicDepartment:{
            type: Schema.Types.ObjectId,
            ref: "AcademicDepartment",
            required: [true, "AcademicDepartment is required"]
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: "AcademicFaculty",
            required: [true, "AcademicFaculty is required"]
        },
        contactNo:{
            type: String,
            required: [true, "ContactNo is required"]
        },
        emergencyContactNo:{
            type: String,
            required: [true, "EmergencyContactNo is required"]
        },
        
    }
)