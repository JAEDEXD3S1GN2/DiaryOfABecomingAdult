import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../utils/tokenService";
import { BaseUrl } from "../../../Baseconfig";
import toast from "react-hot-toast";

const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );
        setUser(payload);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/posts/${postId}/comments`);
      const comms = res.data || [];

      // If API didn't include user info, fetch missing users
      const missingUserIds = [...new Set(comms.filter((c) => !c.user).map((c) => c.userId))];
      if (missingUserIds.length > 0) {
        try {
          const token = getToken();
          const userPromises = missingUserIds.map((uid) =>
            axios
              .get(`${API_BASE}/api/users/${uid}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
              .then((r) => r.data)
              .catch(() => null)
          );
          const users = await Promise.all(userPromises);
          const userMap = {};
          missingUserIds.forEach((id, i) => {
            if (users[i]) userMap[id] = users[i];
          });
          const withUsers = comms.map((c) => ({ ...c, user: c.user || userMap[c.userId] || null }));
          setComments(withUsers);
        } catch (e) {
          setComments(comms);
        }
      } else {
        setComments(comms);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) return alert("Please log in to comment.");
    if (!newContent.trim()) return;
    try {
        const decrypted = getToken();
        const res = await axios.post(
          `${API_BASE}/api/posts/${postId}/comments`,
          { content: newContent },
          { headers: { Authorization: `Bearer ${decrypted}` } }
        );
      setNewContent("");
      setComments((p) => [res.data, ...p]);
    } catch (err) {
      console.error(err);
      alert("Failed to post comment.");
      toast.error("Failed to post comment.");
    }
  };

  const handleDelete = async (id) => {
    const decrypted = getToken();
    if (!decrypted) return alert("Please log in");
    if (!confirm("Delete this comment?")) return;
    try {
      await axios.delete(`${API_BASE}/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${decrypted}` },
      });
      setComments((p) => p.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment.");
      toast.error("Failed to delete comment.");
    }
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditingContent(c.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEdit = async (id) => {
    const decrypted = getToken();
    if (!decrypted) return alert("Please log in");
    if (!editingContent.trim()) return;
    try {
      const res = await axios.patch(
        `${API_BASE}/api/comments/${id}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${decrypted}` } }
      );
      setComments((p) => p.map((c) => (c.id === id ? res.data : c)));
      cancelEdit();
      toast.success("Comment updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to update comment.");
      toast.error("Failed to update comment.");
    }
  };

  return (
    <section className="mt-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>

          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-greenBrand"
              placeholder="Write a thoughtful comment..."
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-greenBrand text-white px-4 py-2 rounded-lg hover:opacity-95"
              >
                Post Comment
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center py-8">Loading comments...</div>
          ) : (
            <ul className="space-y-4">
              {comments.length === 0 && (
                <li className="text-muted text-sm">No comments yet — be the first.</li>
              )}
              {comments.map((c) => (
                <li key={c.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{c.user?.name || c.userName || 'User'}</p>
                      <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(user && (user.id === c.userId || user.role === 'admin')) && (
                        <>
                          {editingId === c.id ? (
                            <>
                              <button
                                onClick={() => saveEdit(c.id)}
                                className="text-sm text-green-600 mr-2"
                              >
                                Save
                              </button>
                              <button onClick={cancelEdit} className="text-sm text-gray-600">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEdit(c)} className="text-sm text-blue-600">Edit</button>
                              <button onClick={() => handleDelete(c.id)} className="text-sm text-red-600 ml-2">Delete</button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    {editingId === c.id ? (
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-2 resize-none h-24 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 whitespace-pre-wrap">{c.content}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
