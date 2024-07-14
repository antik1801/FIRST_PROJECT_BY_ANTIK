import config from "../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
// import { Student } from "../students/student.model";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string , studentData: TStudent) => {

    // we have to create a user object

    // since we are using some partial property field in TUser so we can say partial<TUser>
    const userData : Partial<TUser>  = {};

    // inside user object we have to check whether password is given or not
    userData.password = password || config.default_password as string;

    // we have to set the role of the user --> student
    userData.role = "student";

    // set the student id
    userData.id = "203010001";

//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error("Student is already exists");
//   }
  const newUser = await User.create(userData);

    // now if the results exists means the user is created successfully 
    // so we can move on creating a new student

    // if there is length if the object result
    if(Object.keys(newUser).length)
    {
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const result = await Student.create(studentData);
        return result;
    }

  return newUser;
};

export const userServices = {
  createStudentInDB: createStudentIntoDB,
};
