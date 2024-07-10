import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";


const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
        // no need to validate because default value

    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
        // will set it from api end points 
    },
    isDeleted: {
        type: Boolean,
        default: false,
        // no need to validate because default value
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
        // no need to validate because default value

    }
},
{
    timestamps: true
}
)


export const User = model<TUser>('Users', userSchema);

