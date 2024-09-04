import express  from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationSchema } from "../students/student.zod.validation";
import { facultyValidations } from "../faculty/faculty.validation";







const router = express.Router();

router.post("/create-student", validateRequest(studentValidationSchema.createStudentValidationSchema),  userControllers.createStudent);

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), userControllers.createFaculty);

router.post('/create-admin')

export const usersRoutes = router;
