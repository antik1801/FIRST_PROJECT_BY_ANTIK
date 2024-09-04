import { Router } from "express";
import { adminServices } from "./admin.service";

const router = Router();

router.get('/', adminServices.getAllAdminsFromDB);
router.get("/:id", adminServices.getSingleAdminFromDB);
router.delete("/:id", adminServices.deleteSingleAdminFromDB);



export const adminRoutes = router;