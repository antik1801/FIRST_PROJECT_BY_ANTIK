import express,{Request, Response} from "express";
import { StudentServices } from "./student.services";

const createStudent =async (req: Request, res: Response) =>{
   try {
    const student = req.body;
    const result = await StudentServices.createStudentInDB(student);
    
    res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result
    })

   } catch (error) {
        console.log(error)
   }
}