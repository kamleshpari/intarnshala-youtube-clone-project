import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
//import axios from "axios";
import API from "../services/api";

/*function Comment({ comment, videoId, setVideo }) {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  //const API = import.meta.env.VITE_API_BASE_URL;

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`$/videos/${videoId}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== comment._id),
      }));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await API.put(
        `$/videos/${videoId}/comments/${comment._id}`,
        { text: editText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === comment._id ? res.data : c
        ),
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to edit comment", err);
    }
  };

  return (
    <div className="border-b py-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold">{comment.user?.username || "User"}</p>
          {isEditing ? (
            <>
              <textarea
                className="w-full border p-2 rounded mt-1"
                rows={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm text-gray-600 underline"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm mt-1">{comment.text}</p>
          )}
        </div>

        {user?.userId === comment.userId && !isEditing && (
          <div className="text-sm text-right space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
*/

function Comment({ comment, videoId, setVideo }) {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.commentText);

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`/videos/${videoId}/comments/${comment._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== comment._id),
      }));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await API.put(
        `/videos/${videoId}/comments/${comment._id}`,
        { text: editText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setVideo((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === comment._id ? res.data : c
        ),
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to edit comment", err);
    }
  };

  return (
    <div className="border-b py-3">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold">
            {comment.user_id?.channelName || "User"}
          </p>
          {isEditing ? (
            <>
              <textarea
                className="w-full border p-2 rounded mt-1"
                rows={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleEdit}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm text-gray-600 underline"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm mt-1">{comment.commentText}</p>
          )}
        </div>

        {user?.userId === comment.user_id?._id && !isEditing && (
          <div className="text-sm text-right space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;