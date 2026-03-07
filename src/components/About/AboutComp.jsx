import React from "react";
import growth from "../../assets/images/GROWTH.jpg"
import Podcast from "../../assets/images/Podcast.jpg"

const About = () => {
  return (
    <main className="bg-cream">
      {/* Hero Section */}
      <section className="relative bg-white py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-diary text-blackBrand leading-tight">
            About This Diary
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-blackBrand/70 leading-relaxed">
            This is not a guidebook to adulthood. It’s a living record of growth,
            reflection, mistakes, lessons, and becoming.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-2 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-diary text-blackBrand mb-6">
              Why This Space Exists
            </h2>
            <p className="text-blackBrand/70 leading-relaxed mb-6">
              Becoming an adult often happens quietly. There’s no announcement,
              no manual, and no clear moment when everything suddenly makes
              sense. This diary exists to document that in-between phase —
              learning, unlearning, and growing through real experiences.
            </p>
            <p className="text-blackBrand/70 leading-relaxed">
              Through blog posts and podcasts, this platform shares honest
              thoughts, personal reflections, and lessons learned along the way.
              Not to teach perfection — but to normalize becoming.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="h-96 rounded-3xl bg-blackBrand/5 flex items-center justify-center">
            <img src={`${growth}`} className="text-blackBrand/40 text-sm rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-diary text-center text-blackBrand mb-16">
            What This Diary Stands For
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-greenBrand mb-4">
                Honesty
              </h3>
              <p className="text-blackBrand/70 leading-relaxed">
                Growth begins with truth — even when it’s uncomfortable,
                confusing, or unfinished.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-greenBrand mb-4">
                Growth
              </h3>
              <p className="text-blackBrand/70 leading-relaxed">
                Becoming is a continuous process. This space respects slow,
                intentional progress.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-greenBrand mb-4">
                Reflection
              </h3>
              <p className="text-blackBrand/70 leading-relaxed">
                Taking time to reflect helps us understand where we’ve been —
                and where we’re going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Podcast Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-2 items-center">
          {/* Image Placeholder */}
          <div className="h-96 rounded-3xl bg-blackBrand/5 flex items-center justify-center order-last md:order-first">
            <img src={`${Podcast}`} className="text-blackBrand/40 text-sm rounded-3xl" />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-diary text-blackBrand mb-6">
              Blogs & Podcasts
            </h2>
            <p className="text-blackBrand/70 leading-relaxed mb-6">
              The blog captures written reflections — moments of clarity,
              confusion, and growth. The podcast offers the same honesty in
              spoken form: conversations you can listen to while moving through
              life.
            </p>
            <p className="text-blackBrand/70 leading-relaxed">
              Together, they form a shared experience — reminding you that
              becoming is something many of us are navigating at the same time.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-greenBrand py-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-diary leading-tight">
            Still Becoming. Still Learning.
          </h2>
          <p className="mt-6 text-white/80 text-lg leading-relaxed">
            This diary isn’t about arriving — it’s about continuing. Wherever
            you are in your journey, you’re welcome here.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
