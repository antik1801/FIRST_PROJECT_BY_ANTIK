import { Schema, model} from 'mongoose';
import { Gardian, LocalGuardian, Student, UserName } from './student.interface';
import validator from 'validator';


const userNameSchema = new Schema<UserName>({
    firstName:{
         type: String,
         required: [true,"First name is required"],
         minlength:[3, "First name is no more than 3 charecter"],
         maxlength: [20, "First name should not have more than 20 charector"],
         trim: true,
         validate: {
            validator: (value : string) => validator.isAlpha(value),
            message: "{VALUE} is not a valid name"
         }
        },
    middleName: { type: String, trim: true},
    lastName: {
     type: String,
     required: [true, "Last name is required"],
     minlength: [5, "Last name have at least 5 charector"],
     maxlength: [20, "Last name have not more than 20 charector"] ,
     trim: true,
     validate:
    {validator:  function(value: string): boolean{
        const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
        if(value !== capitaliseFormat)
        {
            return false
        }
        return true
     },
     message: "Last name is not in a valid format"
    }
      }
})

const gardianSchema = new Schema<Gardian>({
    fatherName: {type: String, required: [true, "Father name is required"], trim: true,
        validate:
        { validator : function(value: string): boolean{
            const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
            if(value !== capitaliseFormat)
            {
                return false
            }
            return true
         },
         message: "Father name is in capitalized format"
        }
    },
    fatherOccupation: {type: String, required: [true,"Father occupation is required"], trim: true},
    fatherContactNo: {type: String, required: [true, "Father contact number is required"], trim: true},
    motherName: {type: String, required: [true, "Mother name is required"], trim: true, 
        validate:
        {validator:  function(value: string): boolean{
            const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
            if(value !== capitaliseFormat)
            {
                return false
            }
            return true
         },
         message: "Mother name is not in a capitalized format"
        }
    },
    motherOccupation: {type: String, required: [true, "Mother occupation is required"], trim: true},
    motherContactNo: {type: String, required:[true,"Mother occupation is required"], trim: true}
})

const localGardianSchema = new Schema<LocalGuardian>({
    name: {type: String, required: [true, "Local guardian name is required"], trim: true,

        validate: function(value: string): boolean{
            const capitaliseFormat = value.charAt(0).toUpperCase() + value.slice(1);
            if(value !== capitaliseFormat)
            {
                return false
            }
            return true
         }
    },
    occupation: {type: String, required: [true, "Local guardian occupation is required"], trim: true},
    contactNo: {type: String, required: [true, "Local guardian contact number is required"], trim: true},
    address: {type: String, required: [true, "Local guardian address is required"], trim: true},
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
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email format"
    }
    },
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
    isActive: {
        type: String,
        enum: {
            values: ["active", "blocked"],
            message: "{VALUE} is invalid"
        }
    }
    
})


export const StudentModel = model<Student>('Student', studentSchema);

