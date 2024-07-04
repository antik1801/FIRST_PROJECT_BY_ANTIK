import {Request, Response} from "express";
import { StudentServices } from "./student.services";
import  studentValidationSchema from "./student.zod.validation";
// import JoiValidationSchema from "./student.joi.validation";

const createStudent =async (req: Request, res: Response) =>{
   try {
    
    const {student: studentData} = req.body;

    // --> joi validation schema

    // const {error, value} = JoiValidationSchema.validate(studentData)
    
    // console.log({error}, {value});
    // if(error)
    //     {
    //     res.status(500).json({
    //         success: false,
    //         message: "Something went wrong",
    //         error : error.details
    //     })
    //     }


    // --> Zod validation implementation

    const zodParseData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentInDB(zodParseData)

    // const result = await StudentServices.createStudentInDB(studentData);
    
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


export const StudentController = {
    createStudent
}