import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import channelRoutes from './routes/channelRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/channels', channelRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT, () => console.log("Server running on 4000")))
  .catch((err) => console.error(err));

  ///D3crtYBbhhCrh5e0
  //MONGO_URL=mongodb+srv://vkkamali09:D3crtYBbhhCrh5e0@cluster0.9zquznh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0