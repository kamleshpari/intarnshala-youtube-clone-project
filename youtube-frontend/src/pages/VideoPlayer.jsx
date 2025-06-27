import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";
import API from "../services/api";

function VideoPlayer() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  //const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/${id}`);
        setVideo(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch video", err);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLikeDislike = async (type) => {
  if (!user) return alert("Please sign in to react to this video.");

  try {
    const res = await API.post(
      `/videos/${id}/${type}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Only setVideo if response contains full video object
    if (res.data && res.data._id) {
      setVideo(res.data);
    } else {
      alert(res.data.message || "Action completed.");
    }
  } catch (err) {
    console.error("Failed to update reaction", err);
    alert(err.response?.data?.message || "Reaction failed");
  }
};


  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await API.post(
        `/videos/${id}/comments`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideo((prev) => ({
    ...prev,
      comments: Array.isArray(prev.comments) ? [...prev.comments, res.data] : [res.data],
}));

      setCommentText("");
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (loading) return <p className="text-center">Loading video...</p>;
  if (!video) return <p className="text-center text-red-600">Video not found</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full aspect-video mb-4">
        <video
          src={video.video_url}
          controls
          type="video/mp4"
          className="w-full h-full rounded"
        />
      </div>

      <h2 className="text-xl font-semibold">{video.title}</h2>
      <p className="text-gray-600 text-sm">By {video.channelName}</p>
      <p className="text-sm mt-2 text-gray-700">{video.description}</p>

      
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => handleLikeDislike("like")}
          className="flex items-center gap-1 text-sm text-green-600 hover:underline"
        >
          👍 {video.likes?.length || 0}
        </button>
        <button
          onClick={() => handleLikeDislike("dislike")}
          className="flex items-center gap-1 text-sm text-red-600 hover:underline"
        >
          👎 {video.dislikes?.length || 0}
        </button>
      </div>

      
      {user && (
        <form onSubmit={handleAddComment} className="mt-6">
          <textarea
            placeholder="Add a comment..."
            className="w-full border rounded p-2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 mt-2 rounded"
          >
            Post Comment
          </button>
        </form>
      )}

     
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Comments</h3>
        {video.comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            videoId={video._id}
            setVideo={setVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;

