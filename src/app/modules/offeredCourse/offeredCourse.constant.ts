import { TStatus } from "../semesterRegistration/semesterRegistration.interface";
import { TDays } from "./offeredCourse.interface";

export const Days : TDays[] = ["SAT", "SUN", "MON", "THU", "WED", "TUE", "FRI"] as const;
export const SemesterRegistrationStatus: TStatus[] = [
    "UPCOMING",
    "ONGOING",
    "ENDED",
  ];
  