import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Thread() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-1/2 -translate-x-1/2 h-[4000px] pointer-events-none z-0"
    >
      <svg
        width="300"
        height="4000"
        viewBox="0 0 300 4000"
        className="overflow-visible"
      >
        <motion.path
          d="
          M150 0
          C220 300 80 600 180 900
          C260 1200 90 1500 160 1800
          C220 2100 120 2400 170 2700
          C230 3000 90 3300 180 3600
          C220 3800 150 4000 150 4000
          "
          stroke="#ff2d2d"
          strokeWidth="2"
          fill="transparent"
          style={{
            pathLength,
            opacity: 0.50,
            filter: "drop-shadow(0px 0px 8px #ff2d2d)"
          }}
        />
      </svg>
    </div>
  );
}