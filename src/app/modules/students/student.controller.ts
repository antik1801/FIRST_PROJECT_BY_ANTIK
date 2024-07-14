/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextFunction, Request, RequestHandler, Response} from "express";
import { StudentServices } from "./student.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import JoiValidationSchema from "./student.joi.validation";


const getAllStudents = catchAsync(async (req:Request, res:Response, next: NextFunction) =>{
   
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
        success: true,
        message: "Students are retrieved successfully",
        data: result
    })
})


const getSingleStudent = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{

    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single student retrieved successfully",
    data: result
   })


})

const deleteStudent = catchAsync(async(req:Request, res:Response, next:NextFunction) =>{
    
        
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId)

   sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: result
   });
})

export const StudentController = {
    getAllStudents,
    getSingleStudent,
    deleteStudent
};