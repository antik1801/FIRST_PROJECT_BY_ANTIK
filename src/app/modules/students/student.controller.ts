/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextFunction, Request, Response} from "express";
import { StudentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
// import JoiValidationSchema from "./student.joi.validation";



const getAllStudents = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        })
    } catch (err) {
       next(err);
      
}
}


const getSingleStudent = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        
        const {studentId} = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        if(result)
        {
       sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single student retrieved successfully",
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

    } catch (err) {
        next(err);
    }
}

const deleteStudent = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId)

       sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student deleted successfully",
        data: result
       });

    } catch (err) {
        next(err);
    }
}

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
};