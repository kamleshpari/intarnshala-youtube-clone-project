import mongoose from "mongoose";
import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
  const {
    title,
    description,
    video_url,
    video_id,
    thumbnail_url,
    thumbnail_id,
    category,
    tags = [], 
  } = req.body;

  try {
    console.log("📦 uploadVideo called");
    console.log("📦 req.user:", req.user);

    const newVideo = new Video({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
      video_url,
      video_id,
      thumbnail_url,
      thumbnail_id,
      category,
      tags,
      user_id: req.user._id,
    });

    console.log("🛠 Video document to save:", newVideo); 

    await newVideo.save(); 
    res.status(201).json(newVideo);
  } catch (err) {
    console.error(" Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};


// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("user_id", "channelName logoUrl");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

// Get single video
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("user_id", "channelName logoUrl");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Error fetching video" });
  }
};


export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user._id.toString();

    if (video.likeBy.includes(userId)) {
      return res.status(400).json({ message: "You already liked this video" });
    }

    video.likeBy.push(userId);
    video.likes = video.likeBy.length;

    // Remove from dislikeBy if already disliked
    video.dislikeBy = video.dislikeBy.filter((id) => id.toString() !== userId);
    video.dislikes = video.dislikeBy.length;

    await video.save();

    // Send full updated video
    const updatedVideo = await Video.findById(video._id).populate("user_id", "channelName logoUrl");
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: "Error liking video", error: err.message });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const userId = req.user._id.toString();

    if (video.dislikeBy.includes(userId)) {
      return res.status(400).json({ message: "You already disliked this video" });
    }

    video.dislikeBy.push(userId);
    video.dislikes = video.dislikeBy.length;

    // Remove from likeBy if already liked
    video.likeBy = video.likeBy.filter((id) => id.toString() !== userId);
    video.likes = video.likeBy.length;

    await video.save();

    // Send full updated video
    const updatedVideo = await Video.findById(video._id).populate("user_id", "channelName logoUrl");
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: "Error disliking video", error: err.message });
  }
};
