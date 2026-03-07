import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Baseconfig";
const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getToken } from "../../../utils/tokenService";
import { Mode } from "../../AppContext";

const EditPost = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const LoginStatus = useContext(Mode);
  const externalToken = sessionStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    thumbnailUrl: "",
    videoUrl: "",
    images: "",
  });

  useEffect(() => {

    if (!externalToken) {
      LoginStatus.setIsLoggedin(false);
    } else {
      LoginStatus.setIsLoggedin(true);
    }

    const fetchPost = async () => {

      try {

        const response = await axios.get(
          `${API_BASE}/api/posts/${id}`
        );

        const post = response.data;

        setFormData({
          title: post.title || "",
          description: post.description || "",
          genre: post.genre || "",
          thumbnailUrl: post.thumbnailUrl || "",
          videoUrl: post.videoUrl || "",
          images: post.imageUrls ? post.imageUrls.join(", ") : ""
        });

      } catch (err) {

        console.error(err);
        setError("Unable to load post.");

      } finally {

        setLoading(false);

      }

    };

    fetchPost();

  }, [id]);


  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    setSaving(true);
    setError("");

    try {

      const token = getToken();

      const payload = {
        ...formData,
        images: formData.images
          ? formData.images.split(",").map((img) => img.trim())
          : []
      };

      await axios.patch(
        `${API_BASE}/api/posts/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Post updated successfully ✅");

      navigate(`/blog/${id}`);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Something went wrong while updating the post."
      );

      toast.error("Update failed");

    } finally {

      setSaving(false);

    }

  };


  if (loading) {
    return (
      <div className="text-center py-40 text-lg">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-40 text-red-500 text-lg">
        {error}
      </div>
    );
  }


  return (

    <div className="min-h-screen mt-16 bg-gray-100 flex justify-center py-10 px-4">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Edit Blog Post
        </h2>

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


          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <CKEditor
              editor={ClassicEditor}
              data={formData.description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({ ...prev, description: data }));
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


          {/* Video */}
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>


          {/* Submit */}
          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Post"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditPost;