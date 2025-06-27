import express from "express";
import authMiddleware from "../middewares/authMiddleware.js";
import { getMyChannel } from "../controllers/userController.js"; // or channelController.js

const router = express.Router();

router.get("/my-channel", authMiddleware, getMyChannel);

export default router;
