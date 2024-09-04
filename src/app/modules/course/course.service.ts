/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { TCourse } from "./course.interface"
import { Course } from "./course.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"


const createCoursesIntoDB = async (payload: TCourse) =>{
    const result = await Course.create(payload);
    return result;
}

const getAllCoursesFromDB = async (query: Record<string, unknown>)=>{
    const courseQuery = new QueryBuilder(
        Course.find(), query
    )
    .search(CourseSearchableFields)
    .fields()
    .filter()
    .sort()
    .paginate()

    const result = await courseQuery.modelQuery;
    return result;
}


const getSingleCourseFromDB = async (id: string) =>{
    const result = await Course.findById(id);
    return result;
}


const updateSingleCourseFromDB = async (id: string, payload: Partial<TCourse>) =>{  

   const {preRequisiteCourses, ...courseRemainingData} = payload; 
   
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, 
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        )
        if(!updateBasicCourseInfo)
        {
            throw new AppError(httpStatus.BAD_REQUEST, "Failded to update the course data")
        }
        // check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        // filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses
          .filter((el) => el.course && el.isDeleted)
          .map((el) => el.course);

          const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
            id,
            {
              $pull: {
                preRequisiteCourses: { course: { $in: deletedPreRequisites } },
              },
            },
            {
              new: true,
              runValidators: true,
              session,
            },
          );
    
          if (!deletedPreRequisiteCourses) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
          }

             // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
  
      return result;
        
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

}


const deleteCourseFromDB = async (id: string) =>{
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
          new: true,
        },
      );
      return result;
}

export const courseServices = {
    getAllCoursesFromDB,
    createCoursesIntoDB,
    getSingleCourseFromDB,
    updateSingleCourseFromDB,
    deleteCourseFromDB
}