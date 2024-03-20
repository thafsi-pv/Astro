import React from "react";
import { motion } from "framer-motion";

const BottomToTopFadeAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Initial position (bottom) and opacity
      animate={{ opacity: 1, y: 0 }} // Target position (top) and opacity
      transition={{ duration: 1.5, ease: "easeInOut" }} // Transition duration and easing
      style={{ position: "relative", bottom: 0 }} // Positioning style
    >
      {/* Content inside the animated div */}
      {children}
    </motion.div>
  );
};

export default BottomToTopFadeAnimation;
