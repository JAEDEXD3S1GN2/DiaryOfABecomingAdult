import React from "react";
import { motion } from "framer-motion";
import ReadReflec from "../../assets/images/Hero.jpg"
import ListenAb from "../../assets/images/Listen.jpg"
import Grow from "../../assets/images/Growth2.jpg"

const steps = [
  {
    title: "Read & Reflect",
    description:
      "Thoughtfully written blog posts that explore growth, self-awareness, life lessons, and the realities of becoming an adult.",
    image: ReadReflec,
  },
  {
    title: "Listen & Absorb",
    description:
      "Podcast episodes that feel like honest conversations — stories, reflections, and lessons you can listen to anytime.",
    image: ListenAb,
  },
  {
    title: "Grow at Your Pace",
    description:
      "There’s no rush here. Take what resonates, reflect on it, and grow in your own time and direction.",
    image: Grow,
  },
];

const HowItWorks = () => {

   const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0 },
};

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-Inter md:text-5xl font-diary text-blackBrand">
            How This Website Works
          </h2>
          <p className="mt-6 text-lg font-Merriwether text-blackBrand/70">
            This is a space built for growth — through reading, listening, and
            reflecting on real experiences.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-16 md:flex-row">
            
     {steps.map((step, index) => (
           <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }} > 
            <motion.div variants={item} 
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Image Placeholder */}
              <div className="w-full h-56 rounded-2xl bg-cream flex items-center justify-center mb-8">
                <img src={`${step.image}`} className="text-blackBrand/40 text-sm tracking-wide h-full rounded-t-2xl w-full object-cover object-center" />
              </div>

              {/* Number */}
              <div className="mb-4 text-orangeBrand font-semibold text-sm">
                STEP {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold font-Inter text-greenBrand mb-4">
                {step.title}
              </h3>
              <p className="text-blackBrand/70  font-Merriwether leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
            </motion.div>
          ))}
          
        </div>

        {/* Closing Statement */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-blackBrand/80 font-Merriwether text-lg leading-relaxed">
            This isn’t about perfection or having it all figured out. It’s about
            showing up, learning continuously, and becoming — one story at a
            time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
