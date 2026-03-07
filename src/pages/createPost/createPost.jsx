import { useState } from "react";
import axios from "axios";
import { getToken } from "../../../utils/tokenService";
import { BaseUrl } from "../../../Baseconfig";


const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");
import toast from "react-hot-toast";
import { Mode } from '../../AppContext'
import { useContext, useEffect } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AdminCreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnailUrl: "",
    videoUrl: "",
    images: "",
  });

  const token = sessionStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleDescriptionChange = (data) => {
    // CKEditor returns HTML, you can keep as HTML or convert to text later
    setFormData((prev) => ({ ...prev, description: data }));
  };
  

   const LoginStatus = useContext(Mode);
  
      if(!token){
        LoginStatus.setIsLoggedin(false);
      }else {
        LoginStatus.setIsLoggedin(true);
      };
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const token = getToken();

      const payload = {
        ...formData,
        images: formData.images
          ? formData.images.split(",").map((img) => img.trim())
          : [],
      };

      await axios.post(
        `${API_BASE}/api/posts`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Blog post created successfully ✅");
      toast.success("Blog post created successfully ✅");


      setFormData({
        title: "",
        description: "",
        genre: "",
        thumbnailUrl: "",
        videoUrl: "",
        images: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong while creating post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Create New Blog Post
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

           {/* Description with CKEditor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.description}
              onChange={(event, editor) => {
                const data = editor.getData(); // HTML content
                handleDescriptionChange(data);
              }}
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="text"
              name="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="text"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              placeholder="https://img1.com, https://img2.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminCreatePost;