import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentInDB = async (studentData: TStudent) => {
//   const student = new Student(studentData);
  
    // if(await student.isUserExists(studentData.id))
    // {
    //     throw new Error('Student is already exists');
    // }

    // mongoose static custom methods called
    if(await Student.isUserExists(studentData.id))
        {
            throw new Error('Student is already exists');
        }


  // mongoose build in static method
  const result = await Student.create(studentData)

  // mongoose build in instance method
//   const result = await student.save();



  return result;
};

const getAllStudentsFromDB = async () =>{
  const result = await Student.find();
  return result;
}

const deleteStudentFromDB = async (id: string) =>{
  
}

export const StudentServices = {
  createStudentInDB,
  getAllStudentsFromDB,

};
