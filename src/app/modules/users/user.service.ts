import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { User } from "./user.model";

const createStudentInDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error("Student is already exists");
//   }
  const result = await User.create(studentData);
  return result;
};

export const userServices = {
  createStudentInDB,
};
