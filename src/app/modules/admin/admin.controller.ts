import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";



const getAllAdmins = catchAsync(async (req:Request, res:Response)=>{
    const result = await adminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All admins retrive successfully",
        data: result
    })
})


export const adminControllers = {
    getAllAdmins
}