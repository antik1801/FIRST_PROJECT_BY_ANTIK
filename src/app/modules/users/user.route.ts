import express  from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import createStudentValidationSchema from "../students/student.zod.validation";






const router = express.Router();

router.post("/create-student", validateRequest(createStudentValidationSchema),  userControllers.createStudent);

export const usersRoutes = router;
