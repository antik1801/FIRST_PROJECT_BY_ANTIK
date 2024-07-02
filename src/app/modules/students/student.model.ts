import { Schema, model, connect } from 'mongoose';
import { Gardian, LocalGuardian, Student, UserName } from './student.interface';


const userNameSchema = new Schema<UserName>({
    firstName:{
         type: String,
         required: [true,"First name is required"],
         minlength:[3, "First name is no more than 3 charecter"],
         maxlength: [20, "Last name should not have more than 20 charector"]
        },
    middleName: { type: String},
    lastName: {
     type: String,
     required: [true, "Last name is required"],
     minlength: [5, "Last name have at least 5 charector"],
     maxlength: [20, "Last name have not more than 20 charector"]   
      }
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
    id: { type: String , required: true, unique: true},
    name: {
        type: userNameSchema,
        required: [true,"Name is requires"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male","female"],
            message: "{VALUE} is invalid, Gender must be one of the following 'male' 'female' 'others'" 
        },
        required: true
    },
    dateOfBirth: {type: String},
    email: {type: String, required: [true, "Email is required"], unique: true},
    contactNo: {type: String, required: [true, "Contact number is required"]},
    emergencyContactNo: {type: String, required: [true, "Emergency contact number is required"]},
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: "{VALUE} is invalid Please provide a valid blood group"
        }
    },
    presentAddress: {type: String, required: [true, "Present address is required"]},
    permanentAddress: {type: String, required: [true, "Permanent address is required"]},
    gurdian: {
        type: gardianSchema,
        required: [true, "Guardian's information is required"]
    },
    localGuardian: {
        type: localGardianSchema,
        required: [true, "Local guardian's information is required"]
    },
    profileImg: {type: String},
    isActive: ["active", "blocked"]
    
})


export const StudentModel = model<Student>('Student', studentSchema);

