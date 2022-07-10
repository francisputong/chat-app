import express from "express";
import authMiddleware from "../middleware/auth.js";
import { sendMessage, allMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:chatId", authMiddleware, allMessages);

export default router;
