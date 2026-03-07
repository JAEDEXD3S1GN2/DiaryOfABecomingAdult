import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blackBrand text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top Section */}
        <div className="grid gap-16 md:grid-cols-4">
          {/* Brand / About */}
          <div className="md:col-span-2">
            <h3 className="font-diary font-Inter text-2xl mb-6">
              The Diary of a Becoming Adult
            </h3>
            <p className="text-white/70 font-Merriwether leading-relaxed max-w-md">
              A personal space for growth, reflection, and honest conversations
              about becoming — through stories, blogs, and podcasts.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold font-Inter uppercase tracking-wide mb-6">
              Explore
            </h4>
            <ul className="space-y-4 font-Merriwether text-white/70">
              <li>
                <a
                  href="/"
                  className="hover:text-orangeBrand transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-orangeBrand transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/podcasts"
                  className="hover:text-orangeBrand transition"
                >
                  Podcasts
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-orangeBrand transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold uppercase font-Inter tracking-wide mb-6">
              Connect
            </h4>
            <ul className="space-y-4 font-Merriwether text-white/70">
              <li>
                <a
                  href="#"
                  className="hover:text-orangeBrand transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-orangeBrand transition"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-orangeBrand transition"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-white/10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row font-Inter items-center justify-between gap-6 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} The Diary of a Becoming Adult. All rights
            reserved.
          </p>

          <p className="italic font-Merriwether">
            Still growing, still becoming.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
