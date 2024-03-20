import React from "react";
import { motion } from "framer-motion";
import beachVideo from "../assets/video/beach.mp4";

function HomeVideo() {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <video
        class="w-full h-full object-cover"
        loop={true}
        autoplay={true}
        src={beachVideo}></video>
    </motion.div>
  );
}

export default HomeVideo;
