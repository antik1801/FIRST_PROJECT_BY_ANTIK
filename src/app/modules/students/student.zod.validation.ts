import { z } from 'zod';
import validator from 'validator';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z.string()
    .min(3, "First name is no more than 3 characters")
    .max(20, "First name should not have more than 20 characters")
    .trim()
    .refine(value => validator.isAlpha(value), { message: "{VALUE} is not a valid name" }),
  middleName: z.string(),
  lastName: z.string()
    .min(5, "Last name must have at least 5 characters")
    .max(20, "Last name must not have more than 20 characters")
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Last name is not in a valid format" })
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Father name is in capitalized format" }),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Mother name is not in a capitalized format" }),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().trim()
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string()
    .trim()
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, { message: "Name is not in a capitalized format" }),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim()
});

// Student schema
const studentValidationSchema = z.object({
  id: z.string(),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "others"], { message: "{VALUE} is invalid, Gender must be one of the following 'male', 'female', 'others'" }),
  dateOfBirth: z.string().optional(),
  email: z.string()
    .trim()
    .refine(value => validator.isEmail(value), { message: "{VALUE} is not a valid email format" }),
  contactNo: z.string().trim(),
  emergencyContactNo: z.string().trim(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], { message: "{VALUE} is invalid. Please provide a valid blood group" }).optional(),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  gurdian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  academicDepartment: z.string(),
  isDeleted: z.boolean().optional().default(false)
});

export default studentValidationSchema
