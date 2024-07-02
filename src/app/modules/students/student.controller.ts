import express,{Request, Response} from "express";
import { StudentServices } from "./student.services";
import Joi from "joi";
import JoiValidationSchema from "./student.joi.validation";

const createStudent =async (req: Request, res: Response) =>{
   try {
    
    const {student: studentData} = req.body;
    const {error, value} = JoiValidationSchema.validate(studentData)
    
    console.log({error}, {value});
    if(error)
        {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error : error.details
        })
        }
    const result = await StudentServices.createStudentInDB(studentData);
    
    res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result
    })

   } catch (err) {
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error : err
    })
   }
}


export const StudentController = {
    createStudent
}