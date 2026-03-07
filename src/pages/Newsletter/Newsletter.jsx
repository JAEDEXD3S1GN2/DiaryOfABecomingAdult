import React from "react";

const NewsletterSignup = () => {
  return (
    <main className="bg-cream min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-sm overflow-hidden grid md:grid-cols-2">
        
        {/* Left Content */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <span className="inline-block mb-4 text-sm font-semibold tracking-wide text-greenBrand uppercase">
            Stay Connected
          </span>

          <h1 className="text-4xl md:text-5xl font-diary text-blackBrand mb-6 leading-tight">
            Letters for the Becoming Adult
          </h1>

          <p className="text-blackBrand/70 text-lg leading-relaxed mb-10">
            Join our newsletter for honest reflections, growth reminders, new
            podcast episodes, and blog posts — delivered gently to your inbox.
            No noise. Just growth.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 rounded-full border border-blackBrand/10 px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-greenBrand/40"
            />

            <button
              type="submit"
              className="rounded-full bg-orangeBrand px-8 py-4 text-blackBrand font-semibold transition hover:scale-[1.03] hover:opacity-90"
            >
              Join the Letters
            </button>
          </form>

          <p className="text-xs text-blackBrand/50 mt-6">
            We respect your space. Unsubscribe anytime.
          </p>
        </div>

        {/* Right Visual Placeholder */}
        <div className="hidden md:flex items-center justify-center bg-greenBrand/10">
          <div className="w-72 h-72 rounded-full bg-greenBrand/20 flex items-center justify-center">
            <span className="text-greenBrand font-diary text-xl">
              Image Placeholder
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsletterSignup;
