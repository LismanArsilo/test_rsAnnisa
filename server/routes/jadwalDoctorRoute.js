import { Router } from "express";
import indexController from "../controllers/indexController";
import { verifyAdmin } from "../utils/verifyToken";

const router = Router();

router.get("/:id", verifyAdmin, indexController.jadwalController.findOne);
router.get("/", verifyAdmin, indexController.jadwalController.findAll);
router.post("/", verifyAdmin, indexController.jadwalController.postDoctors);
router.get(
  "/doctor/:id_doctor",
  verifyAdmin,
  indexController.jadwalController.findAllIdDoctor
);

export default router;
