import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Baseconfig";
import { useParams } from "react-router-dom";
import { Mode } from "../../AppContext";
import Comments from "../../components/Comments/Comments";
import { motion } from "framer-motion";

const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");

function isYouTubeUrl(url) {
	if (!url) return false;
	return /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/i.test(url);
}

function getYouTubeEmbedUrl(url) {
	try {
		if (/youtube\.com\/embed\//i.test(url)) return url;
		const u = new URL(url);
		if (u.hostname.includes("youtube.com")) {
			const v = u.searchParams.get("v");
			if (v) return `https://www.youtube.com/embed/${v}`;
		}
		if (u.hostname === "youtu.be") {
			const id = u.pathname.slice(1);
			if (id) return `https://www.youtube.com/embed/${id}`;
		}
	} catch (e) {}
	return url;
}

const PostDetails = () => {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const token = sessionStorage.getItem("token");
	const LoginStatus = useContext(Mode);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!token) LoginStatus.setIsLoggedin(false);
		else LoginStatus.setIsLoggedin(true);

		const fetchPost = async () => {
			try {
				const res = await axios.get(`${API_BASE}/api/posts/${id}`);
				setPost(res.data);
			} catch (err) {
				console.error(err);
				setError("Unable to load post.");
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [id]);

	if (loading) return <div className="text-center py-40 text-lg">Loading post...</div>;
	if (error) return <div className="text-center py-40 text-red-500 text-lg">{error}</div>;
	if (!post) return <div className="text-center py-40 text-lg">Post not found.</div>;

	const appear = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

	return (
		<motion.main
			initial="hidden"
			animate="show"
			className="bg-cream min-h-screen overflow-x-hidden"
		>

			{/* NEW HERO SECTION */}
			<motion.section
				variants={appear}
				className="relative py-20 px-6 bg-gradient-to-br from-greenBrand via-greenBrand/90 to-blackBrand text-white"
			>
				<div className="max-w-4xl mx-auto text-center">

					{/* GENRE BADGE */}
					<span className="inline-block mb-6 px-4 py-1 text-xs tracking-widest uppercase bg-white/20 backdrop-blur-md rounded-full">
						{post.genre}
					</span>

					{/* TITLE */}
					<h1 className="text-4xl md:text-6xl font-diary leading-tight mb-6">
						{post.title}
					</h1>

					{/* CONTENT PREVIEW */}
					<p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
						{post.description
							?.replace(/<[^>]+>/g, "")
							.substring(0, 200)}...
					</p>

				</div>
			</motion.section>

			{/* CONTENT + COMMENTS */}
			<motion.section variants={appear} className="py-12 md:py-20">
				<div className="max-w-4xl mx-auto px-6">

					<div className="bg-white rounded-3xl shadow-lg p-6 md:p-12">

						<div className="prose max-w-none text-gray-800 text-base md:text-lg leading-relaxed">
							<div dangerouslySetInnerHTML={{ __html: post.description }} />
						</div>

						<div className="mt-10">
							<Comments postId={post.id} />
						</div>

					</div>

				</div>
			</motion.section>

			{/* GALLERY */}
			{post.imageUrls && post.imageUrls.length > 0 && (
				<motion.section variants={appear} className="py-12 md:py-20">
					<div className="max-w-6xl mx-auto px-6">

						<h2 className="text-2xl md:text-3xl font-semibold text-blackBrand mb-8">
							Gallery
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{post.imageUrls.map((img, index) => (
								<div
									key={index}
									className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
								>
									<img
										src={img}
										alt="blog visual"
										className="w-full h-[220px] md:h-[320px] object-cover hover:scale-105 transition duration-500"
									/>
								</div>
							))}
						</div>

					</div>
				</motion.section>
			)}

			{/* VIDEO / PODCAST */}
			{post.videoUrl && (
				<motion.section variants={appear} className="py-12 md:py-20">
					<div className="max-w-4xl mx-auto px-6">

						<h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blackBrand">
							Podcast
						</h2>

						<div className="rounded-3xl overflow-hidden shadow-xl bg-white">

							{isYouTubeUrl(post.videoUrl) ? (
								<iframe
									className="w-full h-[240px] md:h-[440px]"
									src={getYouTubeEmbedUrl(post.videoUrl)}
									title="Podcast"
									allowFullScreen
								/>
							) : (
								<div className="w-full h-[240px] md:h-[440px] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-6">
										<p className="mb-4 text-gray-600">
											This link cannot be embedded. Open externally instead.
										</p>

										<a
											href={post.videoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-block bg-greenBrand text-white px-4 py-2 rounded-lg"
										>
											Open Link
										</a>
									</div>
								</div>
							)}

						</div>

					</div>
				</motion.section>
			)}

		</motion.main>
	);
};

export default PostDetails;
