import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

/**
 *
 * https://codesandbox.io/s/vanilla-js-full-page-smooth-scroll-m78lw
 *
 * https://codesandbox.io/s/54cz4?file=/src/SmoothScroll.component.jsx
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */

const sectionVariants = {
  inView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  outView: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const divsVariants = {
  inView: {
    opacity: 1,
    scale: [null, 1.1, 1],
    transition: {
      duration: 0.5,
    },
  },
  outView: {
    scale: 1,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function AnimationInView({ gradient, children }) {
  const { ref, inView } = useInView({
    root: null,
    threshold: 0.2,
    rootMargin: "250px 0px -250px 0px",
    delay: 100,
  });

  return (
    <motion.section
      variants={sectionVariants}
      animate={inView ? "inView" : "outView"}
      initial="outView"
      style={{ "--grad": 20 * gradient }}
      ref={ref}>
      {Array.from({ length: 20 }, (_, k) => (
        <motion.div
          style={{ "--l": `${50 + k}%` }}
          variants={divsVariants}
          key={k}>
          {children}
        </motion.div>
      ))}
    </motion.section>
  );
}

export default function App() {
  const [containerSize, setContainerSize] = useState(0);
  const containerRef = useRef(null);
  const { scrollY } = useViewportScroll();

  // between 0 and height of container
  // return a value between minus height to 0
  // need to translate the container to the opposite of the scroll
  const transform = useTransform(
    scrollY,
    [0, (containerSize)],
    [0, -containerSize]
  );

  // add spring animation
  const spring = useSpring(transform, { stiffness: 10, mass: 1 });

  useEffect(() => {
    const container = containerRef.current;
    const body = document.body;
    const size = container.getBoundingClientRect().height;

    // set the size of the body to be the sized of the container
    // its needed to keep a scrollbar since the container has a fixed position
    // see CSS
    body.style.height = `${size}px`;
    setContainerSize(size);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (Array.isArray(entry.contentBoxSize)) {
          setContainerSize(entry.contentRect.height);
        } else {
          setContainerSize(entry.contentRect.height);
        }
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div>
      <motion.div ref={containerRef} style={{ y: spring }} className="App">
        {Array.from({ length: 20 }, (_, k) => (
          <AnimationInView key={k} gradient={k} />
        ))}
      </motion.div>
      <motion.button
        onClick={() =>
          window.scrollTo({
            top: 0,
          })
        }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="100%"
          height="80%">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
