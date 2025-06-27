import express from "express";
import { uploadThumbnail, uploadVideo } from "../controllers/uploadController.js";
import authMiddleware from "../middewares/authMiddleware.js";
import { uploadImage, uploadVideoFile } from "../middewares/multer.js";


const router = express.Router();

//  Upload thumbnail
router.post("/thumbnail", authMiddleware, uploadImage.single("thumbnail"), uploadThumbnail);

//  Upload video
router.post("/video", authMiddleware, uploadVideoFile.single("video"), uploadVideo);

export default router;
