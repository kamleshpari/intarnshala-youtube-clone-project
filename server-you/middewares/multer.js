import multer from "multer";
import os from "os";
import path from "path";

// Use system temp directory
const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Accept only image files
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed!"), false);
};

// Accept only video files
const videoFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) cb(null, true);
  else cb(new Error("Only video files are allowed!"), false);
};

export const uploadImage = multer({ storage: tempStorage, fileFilter: imageFilter });
export const uploadVideoFile = multer({ storage: tempStorage, fileFilter: videoFilter });
