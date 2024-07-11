import { Student } from "./student.model";


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
  // const result = await Student.findOne({id: id});

  // findOne --> aggregation method
  const result = await Student.aggregate([{$match : {id}}]);
  return result;
}

export const StudentServices = {
  getAllStudentsFromDB,
  deleteStudentFromDB,
  getSingleStudentFromDB
};
