import React from "react";
import { Link } from "react-router-dom";

function formatViews(views) {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
  return views.toString();
}

function VideoCard({ video }) {
  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 xl:w-72">
      <Link to={`/video/${video._id || video.videoId}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-40 object-cover rounded-md border border-gray-200 border-black-500 hover:shadow-lg transition-shadow duration-200"
        />
        <div className="mt-2">
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-600">{video.channelName}</p>
          <p className="text-xs text-gray-500">{formatViews(video.views)} views</p>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
