import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import axios from "axios";
import VideoCard from "../components/VideoCard";
import API from '../services/api'

function Channel() {
  const { channelId } = useParams();
  const { user, token } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  //const API = import.meta.env.VITE_API_BASE_URL;${API}

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await API.get(`/channels/${channelId}`);
        setChannel(res.data);
        setVideos(res.data.videos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching channel", err);
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await API.delete(`/videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(videos.filter((v) => v._id !== videoId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p className="text-center">Loading channel...</p>;
  if (!channel) return <p className="text-center text-red-600">Channel not found</p>;

  const isOwner = user?.userId === channel.owner;

  return (
    <div>
      <div className="bg-gray-200 h-40 rounded mb-4 relative">
        <img
          src={channel.channelBanner }
          alt="Banner"
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{channel.channelName}</h1>
        <p className="text-gray-600">{channel.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          {channel.subscribers}<button className=" bg-red-600 text-white border-4"> subscribers</button>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <div key={video._id} className="relative group">
            <VideoCard video={video} />
            {isOwner && (
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                <button
                  onClick={() => handleDeleteVideo(video._id)}
                  className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Channel;
