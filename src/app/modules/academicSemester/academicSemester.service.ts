import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) =>{
    const result = await AcademicSemester.create(payload);
    return result;
}


// const updateAcademicSemesterValidationSchema = async (id: string, payload: Partial<TAcademicSemester>) =>{
    
// }


export const academicSemesterServices = {
    createAcademicSemesterIntoDB
}