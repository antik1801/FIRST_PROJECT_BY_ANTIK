import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) =>{
    const { section, semesterRegistration, course, faculty , days, startTime, endTime} = payload;
      // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
  await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

   // get the schedule of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {$in: days},
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime
  }

  
}

export const offeredCourseService = {
    createOfferedCourseIntoDB
}