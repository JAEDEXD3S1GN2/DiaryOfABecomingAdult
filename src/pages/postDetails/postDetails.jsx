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
		<motion.main initial="hidden" animate="show" className="bg-cream min-h-screen overflow-x-hidden py-8 md:py-12">

			{/* MOBILE HERO (stacked) - only visible on small screens */}
			<section className="md:hidden w-full px-6 grid gap-4">
				<motion.div variants={appear} className="bg-greenBrand text-white rounded-2xl p-6 flex flex-col justify-center">
					<p className="uppercase tracking-[4px] text-xs opacity-80">Genre</p>
					<h2 className="text-2xl font-semibold mt-3">{post.genre}</h2>
				</motion.div>

				<motion.div variants={appear} className="bg-white rounded-2xl p-6 flex items-center">
					<div>
						<p className="uppercase text-xs tracking-[3px] text-blackBrand/40">Title</p>
						<h1 className="text-2xl font-diary text-blackBrand mt-3 leading-tight">{post.title}</h1>
					</div>
				</motion.div>
			</section>

			{/* DESKTOP HERO (clipped diagonals) - hidden on small, shown md+; reduced height ~60% */}
			<section className="hidden md:grid w-full md:h-[264px] md:grid-cols-2">
				<motion.div variants={appear} className="flex items-center justify-center bg-greenBrand text-white px-12"
					style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)" }}
				>
					<div className="px-6">
						<p className="uppercase tracking-[5px] text-xs opacity-70">Genre</p>
						<h2 className="text-3xl md:text-4xl font-semibold mt-3">{post.genre}</h2>
					</div>
				</motion.div>

				<motion.div variants={appear} className="flex items-center bg-white px-14"
					style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
				>
					<div className="max-w-xl px-6">
						<p className="uppercase text-xs tracking-[4px] text-blackBrand/40">Title</p>
						<h1 className="text-4xl md:text-6xl font-diary text-blackBrand mt-4 leading-tight">{post.title}</h1>
					</div>
				</motion.div>
			</section>

			{/* FEATURE IMAGE */}
			{post.thumbnailUrl && (
				<motion.section variants={appear} className="max-w-6xl mx-auto px-6 mt-6 md:mt-12">
					<div className="bg-white p-4 md:p-6 rounded-3xl shadow-2xl">
						<img src={post.thumbnailUrl} alt={post.title} className="rounded-2xl object-cover object-center w-full h-[260px] md:h-[520px]" />
					</div>
				</motion.section>
			)}

			{/* CONTENT + COMMENTS */}
			<motion.section variants={appear} className="py-8 md:py-20">
				<div className="max-w-4xl mx-auto px-6">
					<div className="bg-white rounded-3xl shadow-lg p-6 md:p-12">
						<div className="prose max-w-none text-gray-800 text-base md:text-lg leading-relaxed">
							<div dangerouslySetInnerHTML={{ __html: post.description }} />
						</div>

						<div className="mt-8">
							<Comments postId={post.id} />
						</div>
					</div>
				</div>
			</motion.section>

			{/* GALLERY */}
			{post.imageUrls && post.imageUrls.length > 0 && (
				<motion.section variants={appear} className="py-8 md:py-20">
					<div className="max-w-6xl mx-auto px-6">
						<h2 className="text-2xl md:text-3xl font-semibold text-blackBrand mb-6">Gallery</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{post.imageUrls.map((img, index) => (
								<div key={index} className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300">
									<img src={img} alt="blog visual" className="w-full h-[220px] md:h-[320px] object-cover hover:scale-105 transition duration-500" />
								</div>
							))}
						</div>
					</div>
				</motion.section>
			)}

			{/* VIDEO / PODCAST */}
			{post.videoUrl && (
				<motion.section variants={appear} className="py-8 md:py-20">
					<div className="max-w-4xl mx-auto px-6">
						<h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blackBrand">Podcast</h2>
						<div className="rounded-3xl overflow-hidden shadow-xl bg-white">
							{isYouTubeUrl(post.videoUrl) ? (
								<iframe className="w-full h-[240px] md:h-[440px]" src={getYouTubeEmbedUrl(post.videoUrl)} title="Podcast" allowFullScreen />
							) : (
								<div className="w-full h-[240px] md:h-[440px] bg-gray-100 flex items-center justify-center">
									<div className="text-center p-6">
										<p className="mb-4 text-gray-600">This link cannot be embedded. Open externally instead.</p>
										<a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-greenBrand text-white px-4 py-2 rounded-lg">Open Link</a>
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

