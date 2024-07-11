import config from "../../config";
import { TStudent } from "../students/student.interface";
import { TNewUser } from "./user.interface";
// import { Student } from "../students/student.model";
import { User } from "./user.model";

const createStudentInDB = async (password: string , studentData: TStudent) => {

    // we have to create a user object

    // since we are using some partial property field in TUser so 
    const newUser : TNewUser  = {
        password: "",
        role: "",
        id : ""
    };

    // inside user object we have to check whether password is given or not
    newUser.password = password || config.default_password as string;

    // we have to set the role of the user --> student
    newUser.role = "student";

    // set the student id
    newUser.id = "203010001";

//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error("Student is already exists");
//   }
  const result = await User.create(newUser);

    // now if the results exists means the user is created successfully 
    // so we can move on creating a new student

    // if there is length if the object result
    if(Object.keys(result).length)
    {
        studentData.id = result.id;

    }

  return result;
};

export const userServices = {
  createStudentInDB,
};
