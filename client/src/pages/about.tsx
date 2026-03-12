import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Thread from "/Users/harmeetwalia/Downloads/aura-landing/client/src/components/ui/Threads";
import Footer from "/Users/harmeetwalia/Downloads/aura-landing/client/src/components/ui/Footer";
import { Link } from "wouter";

function TopBar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

      <div className="flex items-center justify-between gap-16 px-8 py-3 rounded-full bg-[#0b0b0b] border border-white/10 backdrop-blur-xl">

        {/* Logo */}
        <Link to="/">
          <span className="text-blue-500 font-semibold text-lg cursor-pointer">
            noChaos
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-white text-sm">

          <Link to="/about">
            <span className="cursor-pointer hover:text-blue-500">
              Our Story
            </span>
          </Link>

          <Link to="/feedback">
            <span className="cursor-pointer hover:text-blue-500">
              Feedback
            </span>
          </Link>

      

          <button className="px-4 py-1.5 rounded-full bg-blue-600">
            Join
          </button>

        </div>

      </div>

    </div>
  );
}




function DesignSection() {
  return (
    <section className="relative py-40 text-center text-white">

      <p className="text-red-500 text-xl font-semibold mb-6">
        noChaos
      </p>

      <h1 className="text-white text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">
        Most platforms focus on content.
      </h1>

      <p className="text-blue-500 text-3xl font-semibold mt-8">
        noChaos
      </p>

      <h2 className="text-white text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto mt-2">
        focuses on connection.
      </h2>

      <p className="text-gray-400 mt-10 text-lg max-w-3xl mx-auto leading-relaxed">
        Discover activities around you, connect with people who share your vibe,
        and build meaningful interactions through posting, following, matching
        and socialising.
      </p>

      <p className="text-red-500 text-3xl font-semibold mt-16">
        All Private
      </p>

    </section>
  );
}

function WorkWithUsSection() {
  return (
    <section className="bg-black py-40">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 px-10 md:px-20">

        {/* LEFT IMAGE */}
        <div className="overflow-hidden rounded-3xl">

          <img
            src="/images/paris.png"
            className="w-full h-[520px] object-cover"
          />

        </div>

        {/* RIGHT TEXT */}
        <div className="text-white">

          <h2 className="text-5xl font-bold mb-6">
            Work with us
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            Individuals build noChaos. 
            <br />
            We are a team of people who believe in the power of connection and shared experiences.
            Let us know if you have some suggestions, want to collaborate, or just want to say hi.
          </p>

         

        </div>

      </div>

    </section>
  );
}

export default function About() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  /* Image expansion */
  const width = useTransform(scrollYProgress, [0, 1], [420, window.innerWidth]);
  const height = useTransform(scrollYProgress, [0, 1], [560, window.innerHeight]);

  /* Grayscale → Color */
  const filter = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["grayscale(100%)", "grayscale(0%)"]
  );

  const borderRadius = useTransform(scrollYProgress, [0, 0.6], [24, 0]);

  return (
    <div className="bg-black">

      <section ref={ref} className="h-[200vh] relative">

        <div className="sticky top-0 h-screen flex">

          {/* LEFT TEXT */}
          <div className="w-1/2 flex items-center px-20 text-white z-10">

            <div>

              <p className="text-white text-6xl md:text-7xl font-bold leading-tight">
                Our Story
              </p>

              <p className="text-blue-500 text-lg md:text-xl mt-10 max-w-xl leading-relaxed">
                noChaos is built around the things people love to do.
                <br />
                Post what you're doing, discover others like you, match through
                shared interests, and connect globally.
              </p>

            </div>

          </div>

          {/* EXPANDING IMAGE */}
          <div className="w-1/2 flex items-center justify-center">

            <motion.img
              src="/images/strings.jpg"
              style={{ width, height, filter, borderRadius }}
              className="object-cover"
            />

          </div>

        </div>

      </section>
        <TopBar />
        <Thread />
      <DesignSection />
    <WorkWithUsSection />
    <Footer />

    </div>
  );
}