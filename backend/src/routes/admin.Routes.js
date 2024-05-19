import express from "express";
import path from "path";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getCurrentAdmin,

} from "../controllers/admin.Controllers.js";
import { upload } from "../middlewares/multer.Middleware.js";
import { verifyJWT } from "../middlewares/auth.Middleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  registerAdmin
);
router.post("/login", loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);
router.post("/refresh-token", refreshAccessToken);
router.get("/current-admin", verifyJWT, getCurrentAdmin);

export default router;
