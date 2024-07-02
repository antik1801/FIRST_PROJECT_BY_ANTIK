import { Schema, model, connect } from 'mongoose';
import { Gardian, LocalGuardian, Student, UserName } from './student.interface';


const userNameSchema = new Schema<UserName>({
    firstName:{ type: String, required: [true,"First name is required"] },
    middleName: { type: String},
    lastName: { type: String, required: [true, "Last name is required"] }
})

const gardianSchema = new Schema<Gardian>({
    fatherName: {type: String, required: [true, "Father name is required"]},
    fatherOccupation: {type: String, required: [true,"Father occupation is required"]},
    fatherContactNo: {type: String, required: [true, "Father contact number is required"]},
    motherName: {type: String, required: [true, "Mother name is required"]},
    motherOccupation: {type: String, required: [true, "Mother occupation is required"]},
    motherContactNo: {type: String, required:[true,"Mother occupation is required"]}
})

const localGardianSchema = new Schema<LocalGuardian>({
    name: {type: String, required: [true, "Local guardian name is required"]},
    occupation: {type: String, required: [true, "Local guardian occupation is required"]},
    contactNo: {type: String, required: [true, "Local guardian contact number is required"]},
    address: {type: String, required: [true, "Local guardian address is required"]},
})

const studentSchema = new Schema<Student>({
    id: { type: String },
    name: {
        type: String,
        required: [true,"Name is requires"]
    },
    gender: ["male","female"],
    dateOfBirth: {type: String},
    email: {type: String, required: [true, "Email is required"]},
    contactNo: {type: String, required: [true, "Contact number is required"]},
    emergencyContactNo: {type: String, required: [true, "Emergency contact number is required"]},
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: {type: String, required: [true, "Present address is required"]},
    permanentAddress: {type: String, required: [true, "Permanent address is required"]},
    gurdian: gardianSchema,
    localGuardian: localGardianSchema,
    profileImg: {type: String},
    isActive: ["active", "blocked"]
    
})


export const StudentModel = model<Student>('Student', studentSchema);

