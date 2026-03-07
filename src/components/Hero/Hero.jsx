import React from 'react'
import DiaryBg from "../../assets/images/Diary1.png"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {

  const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};

  return (
    <motion.div
  initial={{ opacity: 0, y: 65 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9 }}
  viewport={{ once: false, amount: 0.3 }}
>

    <div className='relative bg-center bg-cover bg-GGG py-60 pl-10'
    // style={{ backgroundImage: `url(${DiaryBg})` }}
    >
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm'></div>
     <div className=' relative z-10 rounded-[10px] bg-cream/70 w-[90%] sm:w-max px-3 py-5'>
     <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
    >
      <motion.h1 variants={item} className='text-orangeBrand font-bold text-4xl font-Inter mb-0.5'>The Diary of A Becoming Adult</motion.h1>
      <motion.p variants={item} className='text-black font-bold text-xl font-Merriwether mb-8.75'>Growing up isn't a destination - it's a journey to becoming..</motion.p>
      <motion.button variants={item} className='text-black font-bold text-xl font-Merriwether bg-orangeBrand w-max rounded-md px-3 py-3 hover:bg-green-400 hover:text-white'>Explore Thoughts</motion.button>
     </motion.div>
     </div>
    </div>
    </motion.div>    
  )
}

export default Hero