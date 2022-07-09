import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroup,
    removeFromGroup,
} from "../controllers/chat.js";

const router = express.Router();

router.post("/", authMiddleware, accessChat);
router.get("/", authMiddleware, fetchChats);
router.post("/group", authMiddleware, createGroupChat);
router.put("/rename", authMiddleware, renameGroupChat);
router.put("/groupremove", authMiddleware, removeFromGroup);
router.put("/groupadd", authMiddleware, addToGroup);

export default router;
