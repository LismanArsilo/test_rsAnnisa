import { Router } from "express";
import indexController from "../controllers/indexController";
import { verifyAdmin } from "../utils/verifyToken";

const router = Router();

router.get("/", verifyAdmin, indexController.doctorController.findAll);
router.get("/:id", verifyAdmin, indexController.doctorController.findOne);

export default router;
