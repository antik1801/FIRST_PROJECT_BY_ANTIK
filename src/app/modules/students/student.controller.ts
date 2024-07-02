import express,{Request, Response} from "express";
import { StudentServices } from "./student.services";

const createStudent =async (req: Request, res: Response) =>{
   try {
    const {student: studentData} = req.body;
    const result = await StudentServices.createStudentInDB(studentData);
    
    res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result
    })

   } catch (err) {
    res.status(500).json({
        success: true,
        message: 'Something went wrong',
        error : err
    })
   }
}


export const StudentController = {
    createStudent
}