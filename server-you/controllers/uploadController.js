import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

//  Upload Thumbnail
export const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "youtube_thumbnails",
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Thumbnail upload error:", err);
    res.status(500).json({ message: "Thumbnail upload failed", error: err.message });
  }
};



export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📤 Uploading video:", req.file.path);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        req.file.path,
        {
          resource_type: "video",
          folder: "youtube_videos",
          chunk_size: 6000000, // 6MB chunks
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });

    // Optional: remove local file
    fs.unlinkSync(req.file.path);

    console.log("Cloudinary upload result:", result);

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error(" Video upload error:", err);
    res
      .status(500)
      .json({ message: "Video upload failed", error: err.message });
  }
};