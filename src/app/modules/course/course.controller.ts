import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createCourse = catchAsync(async(req:Request, res:Response) =>{
    const result = await courseServices.createCoursesIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course created successfully", 
        data: result
    })
})


const getAllCourses = catchAsync(async (req:Request, res: Response)=>{
    const result = await courseServices.getAllCoursesFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All courses fetched successfully",
        data: result
    })
})

const getSingleCourse = catchAsync(async (req:Request, res:Response) =>{
    const {courseId} = req.params;
    const result = await courseServices.getSingleCourseFromDB(courseId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single Course fetched successfully",
        data: result
    })
})

const updateSingleCourse = catchAsync(async (req:Request, res:Response) =>{
    const {courseId} = req.params;
    const result = await courseServices.updateSingleCourseFromDB(courseId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Single course updated successfully",
        data: result
    })
})


const deleteSingleCourse = catchAsync(async (req:Request, res:Response) =>{
    const {courseId} = req.params;
    const result = await courseServices.deleteCourseFromDB(courseId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course deleted successfully",
        data: result
    })
})


export const coursesController = {
    getAllCourses,
    createCourse, 
    getSingleCourse,
    updateSingleCourse,
    deleteSingleCourse
}
