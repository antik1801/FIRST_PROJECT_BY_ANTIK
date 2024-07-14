import express from "express";
import { StudentsRoutes } from "../modules/students/student.route";
import { usersRoutes } from "../modules/users/user.route";

const router = express.Router();

router.use("/students", StudentsRoutes);
router.use("/users", usersRoutes);

export default router;
