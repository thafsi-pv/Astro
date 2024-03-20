import React from "react";
import { motion } from "framer-motion";

function HomeTitle() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <p className="text-white text-[150px] font-extrabold">SURFING</p>
      <p className="text-white text-[40px] font-extralight -mt-16">
        Ocean Adventures
      </p>
    </motion.div>
  );
}

export default HomeTitle;
