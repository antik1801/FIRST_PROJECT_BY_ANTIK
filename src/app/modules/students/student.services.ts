import { Student } from "./student.interface";
import { StudentModel } from "./student.model";


const createStudentInDB = async (studentData : Student) =>{
    const student = new StudentModel(studentData);

    // mongoose build in static method
    // const result = await StudentModel.create(studentData)

    // mongoose build in instance method
    const result = await student.save();
    
    return result;
}

export const StudentServices = {
    createStudentInDB,
}