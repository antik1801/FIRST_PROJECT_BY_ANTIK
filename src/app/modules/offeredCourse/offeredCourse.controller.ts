import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createOfferedCourse = catchAsync(async (req:Request, res:Response)=>{
    const courseData = req.body;
    sendResponse(res, {
        success: true, 
        statusCode: httpStatus.OK,
        message: "Offered course created successfully",
        data: courseData
    })
})


export const offeredCourseController = {
    createOfferedCourse
}