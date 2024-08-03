import express from "express";
import { StudentsRoutes } from "../modules/students/student.route";
import { usersRoutes } from "../modules/users/user.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: usersRoutes,
  },
  {
    path: "/students",
    route: StudentsRoutes,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
