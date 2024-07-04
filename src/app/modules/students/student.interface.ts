import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
};

export type StudentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
};

// creating a student model for builtin instance methods

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;

// Now it will be give an error → probably want object instance
// Solution :
// Replace → Record<string , never> in student Model
