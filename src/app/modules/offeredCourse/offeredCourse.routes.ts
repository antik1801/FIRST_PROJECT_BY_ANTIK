import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidation } from "./offeredCourse.validation";


const router = Router();

router.post("/create-offered-course", validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), )


export const offeredCourseRoutes = router;