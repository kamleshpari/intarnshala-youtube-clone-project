import express from "express";
import {
  getMyProfile,
  getChannelById,
  subscribe,
  unsubscribe,
} from "../controllers/userController.js";
import authMiddleware from "../middewares/authMiddleware.js";


const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.get("/:id", getChannelById);
router.post("/:id/subscribe", authMiddleware, subscribe);
router.post("/:id/unsubscribe", authMiddleware, unsubscribe);

export default router;
