import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.delete("/:studentId", StudentController.deleteStudent);

router.get("/:studentId", StudentController.getSingleStudent);

export const StudentsRoutes = router;
