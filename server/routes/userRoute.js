import { Router } from "express";
import indexController from "../controllers/indexController";

const router = Router();

router.post("/registrasi", indexController.userController.registrasi);
router.post("/login", indexController.userController.login);
router.get("/logout", indexController.userController.logout);

export default router;
