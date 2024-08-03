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
  "/:id",
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema
  )
);
router.get("/");
router.get("/:id");

export const academicSemesterRoutes = router;
