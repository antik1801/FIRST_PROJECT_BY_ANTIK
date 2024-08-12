import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req: Request, res: Response) =>{
    const {password , student: studentData} = req.body;
   //  const zodParseData = studentValidationSchema.parse(studentData);
    const result = await userServices.createStudentInDB(password, studentData)
    
    sendResponse(res, {
       statusCode: httpStatus.OK,
       success: true,
       message: "Student created successfully",
       data: result
    });
  
})
 

export const userControllers = {
    createStudent
}