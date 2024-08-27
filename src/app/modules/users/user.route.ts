import express  from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidationSchema } from "../students/student.zod.validation";







const router = express.Router();

router.post("/create-student", validateRequest(studentValidationSchema.createStudentValidationSchema),  userControllers.createStudent);

export const usersRoutes = router;
