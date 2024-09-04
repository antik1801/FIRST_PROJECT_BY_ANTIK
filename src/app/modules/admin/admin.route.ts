import { Router } from "express";
import { adminServices } from "./admin.service";

const router = Router();

router.get('/', adminServices.getAllAdminsFromDB);



export const adminRoutes = router;