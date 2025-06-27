import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import FilterBar from "../components/FilterBar";
import axios from "axios";

function Home() {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const API = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API}/videos`);
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchVideos();
  }, [API]);

 useEffect(() => {
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category");

  let result = Array.isArray(videos) ? videos : [];

  if (search) {
    result = result.filter((v) =>
      v.title?.toLowerCase().includes(search)
    );
  }

  if (category) {
    result = result.filter((v) =>
      v.category?.toLowerCase() === category.toLowerCase()
    );
  }

  setFiltered(result);
}, [searchParams, videos]);
  return (
    <div>
      <FilterBar />
      {loading ? (
        <p className="text-center">Loading videos...</p>
      ) : filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtered.map((video) => (
            <VideoCard key={video._id || video.videoId} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No videos found.</p>
      )}
    </div>
  );
}

export default Home;
