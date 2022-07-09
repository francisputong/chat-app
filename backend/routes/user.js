import express from "express";
import { authUser, registerUser, allUsers } from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", authMiddleware, allUsers);
router.post("/login", authUser);

export default router;
