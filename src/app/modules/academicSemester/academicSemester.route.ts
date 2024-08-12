import express from "express";
import { academicSemesterValidation } from "./academicSemester.validation";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterControllers } from "./academicSemerster.controller";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.createAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema
  )
);
router.get("/", academicSemesterControllers.getAllAcademicSemester);
router.get("/:semesterId", academicSemesterControllers.getSingleAcademicSemester);

export const academicSemesterRoutes = router;
