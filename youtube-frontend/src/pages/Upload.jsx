import React from "react";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !thumbnail) {
      alert("Please upload both video and thumbnail");
      return;
    }

    try {
      // 1. Upload Thumbnail
      const thumbForm = new FormData();
      thumbForm.append("thumbnail", thumbnail);

      const thumbRes = await API.post("/upload/thumbnail", thumbForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { url: thumbnail_url, public_id: thumbnail_id } = thumbRes.data;

      // 2. Upload Video
      const videoForm = new FormData();
      videoForm.append("video", video);

      const videoRes = await API.post("/upload/video", videoForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { url: video_url, public_id: video_id } = videoRes.data;

      if (!video_url || !video_id) {
        console.error("❌ Missing video_url or video_id in response");
        return alert("Video upload failed: Invalid response from server");
      }

      // 3. Save Metadata
      await API.post(
        "/videos",
        {
          title,
          description: desc,
          category,
          tags: tags.split(",").map((tag) => tag.trim()),
          video_url,
          video_id,
          thumbnail_url,
          thumbnail_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Video uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border p-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;