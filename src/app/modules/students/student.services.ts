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
  const result = await Student.updateOne({id}, {isDeleted: true})
  return result;
}

const getSingleStudentFromDB = async (id: string) =>{

   // findOn normal method 
  const result = await Student.findOne({id: id});

  // findOne --> aggregation method
  // const result = await Student.aggregate([{$match : {id}}]);
  return result;
}

export const StudentServices = {
  createStudentInDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
  getSingleStudentFromDB
};
