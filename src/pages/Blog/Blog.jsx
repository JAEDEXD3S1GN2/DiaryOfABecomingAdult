import React, {useState} from "react";
import axios from "axios";
import Growth from "../../assets/images/Herologo1.jpg"
import Uncertainty from "../../assets/images/Uncertainty.jpg"
import mistakes from "../../assets/images/faliureBlog.jpg"
import convo from "../../assets/images/communication.jpg"
import {useEffect, useContext } from "react";
import { Mode } from "../../AppContext";
import { Link } from "react-router-dom";
import { isAdmin } from "../../../utils/tokenService";
import { BaseUrl } from "../../../Baseconfig";

const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");


const Blog = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
  const LoginStatus = useContext(Mode);

  useEffect(() => {

    if (!token) {
      LoginStatus.setIsLoggedin(false);
    } else {
      LoginStatus.setIsLoggedin(true);
    }

    const fetchPosts = async () => {
      try {

        const response = await axios.get(`${API_BASE}/api/posts`);

        if (!response.data || response.data.length === 0) {
          setPosts([]);
        } else {
          setPosts(response.data);
        }

      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Unable to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

  }, []);


  const handleDelete = async (postId) => {

  if (!window.confirm("Are you sure you want to delete this post?")) return;

  try {

    const token = sessionStorage.getItem("token");

    await axios.delete(`${API_BASE}/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success("Post deleted successfully");

    // remove deleted post from UI
    setPosts(posts.filter((post) => post.id !== postId));

  } catch (error) {

    console.error(error);
    toast.error("Failed to delete post");

  }

};

  return (
    <main className="bg-cream min-h-screen">

      {/* Header */}
      <section className="bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-diary text-blackBrand">
            The Diary
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-blackBrand/70 leading-relaxed">
            Stories, reflections, and conversations about growth, learning, and becoming.
          </p>
        </div>
      </section>


      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Loading */}
          {loading && (
            <p className="text-center text-blackBrand/70 text-lg">
              Loading posts...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 text-lg">
              {error}
            </p>
          )}

          {/* No Posts */}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-blackBrand/60 text-lg">
              No posts made yet.
            </p>
          )}

          {/* Posts */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >

                  {/* Image */}
                  <div className="h-56 bg-blackBrand/5">
                    <img
                      src={post.thumbnailUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col h-full">

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-greenBrand font-medium">
                        {post.genre}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-blackBrand mb-4">
                      {post.title}
                    </h2>

                    {/* <p className="text-blackBrand/70">
                      {post.description.length > 50
                        ? post.description.slice(0, 50) + "..."
                        : post.description}
                    </p> */}
                   <div
  dangerouslySetInnerHTML={{
    __html:
      post.description.length > 50
        ? post.description.slice(0, 50) + "..."
        : post.description,
  }}
/>

                    <div className="flex items-center gap-4 mt-5">

  <Link
    to={`/blog/${post.id}`}
    className="text-orangeBrand font-medium hover:underline"
  >
    Read More →
  </Link>

  {isAdmin() && (
    <>
      <Link
        to={`/editBlogPost/${post.id}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Edit
      </Link>

      <button
        onClick={() => handleDelete(post.id)}
        className="text-red-500 font-medium hover:underline"
      >
        Delete
      </button>
    </>
  )}

</div>
                  </div>

                </article>
              ))}

            </div>
          )}

        </div>
      </section>


      {/* Closing CTA */}
      <section className="bg-greenBrand py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-diary">
            Every post is part of the process
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Take what resonates. Leave what doesn’t. Keep becoming.
          </p>
        </div>
      </section>

    </main>
  );
};

export default Blog;