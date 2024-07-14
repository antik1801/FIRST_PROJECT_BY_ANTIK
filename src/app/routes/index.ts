import express from "express";
import { StudentsRoutes } from "../modules/students/student.route";
import { usersRoutes } from "../modules/users/user.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: usersRoutes
    },
    {
        path: "/students",
        route: StudentsRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;
