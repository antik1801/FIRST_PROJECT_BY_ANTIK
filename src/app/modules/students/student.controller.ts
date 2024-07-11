/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from "express";
import { StudentServices } from "./student.services";
// import JoiValidationSchema from "./student.joi.validation";



const getAllStudents = async (req:Request, res:Response) =>{
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
          });
      
}
}


const getSingleStudent = async(req:Request, res:Response) =>{
    try {
        
        const {studentId} = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        if(result)
        {
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        })
        }
        else
        {
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
          });
    }
}

const deleteStudent = async(req:Request, res:Response) =>{
    try {
        
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId)

        res.status(200).json({
            success: true,
            message: 'Student is deleted successfully',
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
          });
    }
}

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
};