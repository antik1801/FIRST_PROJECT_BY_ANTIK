import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";



const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name:{
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

academicDepartmentSchema.pre("save", async function (next){
    const isDepartmentExists = await AcademicDepartment.findOne({name: this.name})
    if(isDepartmentExists)
    {
        throw new Error(`${this.name} already exists`);
    }
    next();
})

academicDepartmentSchema.pre("findOneAndUpdate", async function (next){
    const departmentId = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(departmentId);
    if(!isDepartmentExists)
    {
        throw new Error(`This department does not exist in database`);
    }
    next();
})

academicDepartmentSchema.pre('find', async function (next){
    this.find({isDeleted: {$ne: true}});
    next();
})

academicDepartmentSchema.pre('findOne', async function (next){
    this.find({isDeleted: {$ne: true}});
    next();
})


export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema)