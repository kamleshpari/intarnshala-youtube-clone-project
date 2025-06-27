import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    logoUrl: { type: String, required: true },
    logoId: { type: String, required: true },
    subscribers: { type: Number, default: 0 },
    subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subscribedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
