import User from "../models/User.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

// Get own profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Get a channel by ID
export const getChannelById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Channel not found" });

    const videos = await Video.find({ user_id: user._id });

    res.json({ channel: user, videos });
  } catch (err) {
    res.status(500).json({ message: "Error fetching channel" });
  }
};

// Subscribe to a channel
export const subscribe = async (req, res) => {
  const channelId = req.params.id;
  const userId = req.user.id;

  if (channelId === userId) return res.status(400).json({ message: "You cannot subscribe to yourself" });

  try {
    const user = await User.findById(userId);
    const channel = await User.findById(channelId);

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    if (user.subscribedChannels.includes(channelId)) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    user.subscribedChannels.push(channelId);
    channel.subscribedBy.push(userId);
    channel.subscribers = channel.subscribedBy.length;

    await user.save();
    await channel.save();

    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing" });
  }
};

// Unsubscribe from a channel
export const unsubscribe = async (req, res) => {
  const channelId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const channel = await User.findById(channelId);

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    user.subscribedChannels = user.subscribedChannels.filter(
      (id) => id.toString() !== channelId
    );
    channel.subscribedBy = channel.subscribedBy.filter(
      (id) => id.toString() !== userId
    );
    channel.subscribers = channel.subscribedBy.length;

    await user.save();
    await channel.save();

    res.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error unsubscribing" });
  }
};

////chennal
export const getMyChannel = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "Channel not found" });

    const videos = await Video.find({ user_id: user._id });

    res.json({ channel: user, videos });
  } catch (err) {
    res.status(500).json({ message: "Error fetching channel" });
  }
};
