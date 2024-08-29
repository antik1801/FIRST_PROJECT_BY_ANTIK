import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
// import { Student } from "../students/student.model";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string , payload: TStudent) => {

    // we have to create a user object

    // since we are using some partial property field in TUser so we can say partial<TUser>
    const userData : Partial<TUser>  = {};

    // inside user object we have to check whether password is given or not
    userData.password = password || (config.default_password as string);

    // we have to set the role of the user --> student
    userData.role = "student";

    // set the student id
    // userData.id = "203010001";

   

    // find academic semester information
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    // Ensure admission semester can not NULL
    if(!admissionSemester) {
      throw new Error("Admission semester not found in database or the value is NULL");
    }
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);
    if(!academicDepartment)
    {
      throw new AppError(httpStatus.NOT_FOUND, "This academic department does not exists in DATABASE");
    }
    const session = await mongoose.startSession();

   try {
      session.startTransaction();
      userData.id = await generateStudentId(admissionSemester);
      const newUser = await User.create([userData], {session});

      if(!newUser.length){
        throw new Error("Failed to create new student");
      }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;

      const newStudent = await Student.create([payload], {session});
      if(!newStudent.length){
        throw new Error("Failed to create new student");
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudent;
   } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');    
   }

};

export const userServices = {
  createStudentInDB: createStudentIntoDB,
};
