import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { academicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async(req: Request, res: Response) =>{
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Academic Semester successfully created",
        data: result
    })
})


export const academicSemesterControllers = {
    createAcademicSemester
}