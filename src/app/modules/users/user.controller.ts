import { Request, Response } from "express";
import { userServices } from "./user.service";



const createStudent =async (req: Request, res: Response) =>{
    try {
     
     const {password , student: studentData} = req.body;
 
    //  const zodParseData = studentValidationSchema.parse(studentData);
 
     const result = await userServices.createStudentInDB(password, studentData)
     
     res.status(200).json({
         success: true,
         message: 'Student is created successfully',
         data: result
     })
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
     res.status(500).json({
         success: false,
         message: err.message || 'Something went wrong',
         error : err
     })
    }
 }
 

export const userControllers = {
    createStudent
}