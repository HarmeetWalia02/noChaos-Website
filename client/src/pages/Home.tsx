import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
//import { Link } from "react-router-dom"; 
import { Link } from "wouter";
import Footer from "@/components/ui/Footer";

/* -------------------- TOP BAR -------------------- */

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

/* -------------------- PHONE NOTIFICATION -------------------- */

const notifications = [
  "Harmeet Shared a New Activity",
  "Shanya Shared a New Activity",
  "Veer Requested to Follow You",
];

function NotificationPhone() {
  return (
    <div className="w-[340px] rounded-[48px] border border-white/10 bg-black shadow-2xl overflow-hidden">

      <div className="flex justify-center pt-4 pb-5">
        <div className="w-28 h-7 bg-gray-900 rounded-full"></div>
      </div>

      <motion.div
        className="px-5 pb-8 space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.8 } }
        }}
      >

        {notifications.map((text, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: -40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            className="bg-[#111] p-4 rounded-xl border border-white/10"
          >
            <p className="text-xs text-gray-400">noChaos</p>
            <p className="text-sm text-white">{text}</p>
          </motion.div>
        ))}

      </motion.div>

    </div>
  );
}

/* -------------------- HERO SECTION -------------------- */

function HeroSection() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const phoneUp = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const phoneDown = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const logoOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={ref} className="h-[200vh] bg-black">

      <div className="sticky top-0 h-screen flex items-center justify-center">

        <div className="relative flex items-center justify-center">

          <motion.div style={{ y: phoneUp }} className="absolute z-20">
            <NotificationPhone />
          </motion.div>

          <motion.div style={{ y: phoneDown }} className="absolute scale-95 opacity-70">
            <NotificationPhone />
          </motion.div>

          <motion.div
            style={{ opacity: logoOpacity }}
            className="absolute text-7xl font-bold"
          >

            <motion.span
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="text-red-600"
            >
              no
            </motion.span>

            <motion.span
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="text-red-500"
            >
              Chaos
            </motion.span>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

/* -------------------- HELLO SECTION -------------------- */

function HelloSection() {
  return (
    <section className="min-h-screen bg-black pt-40">

      <div className="text-center mb-32">
        <h1 className="text-white text-6xl font-bold">
          Hello there
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 px-8">

        <div className="flex flex-col gap-4">

          <h2 className="text-white text-7xl font-bold leading-none">
            CONNECT
          </h2>

          <h2 className="text-blue-500 text-7xl font-bold leading-none">
            ACTIVITY
          </h2>

          <h2 className="text-white text-7xl font-bold leading-none">
            MATCH
          </h2>

          <p className="text-gray-400 text-lg mt-6 max-w-md">
            Simple way to connect your real ones
          </p>

        </div>

        <div className="flex justify-center">
          <NotificationPhone />
        </div>

      </div>

    </section>
  );
}

/* -------------------- ACTIVITY SLIDER -------------------- */

type Activity = {
  src: string;
  title: string;
};

const activities: Activity[] = [
  { src: "/videos/workingout.mov", title: "Working Out" },
  { src: "/videos/music.mov", title: "Music Sessions" },
  { src: "/videos/dog.mov", title: "Cute Dog" },
  { src: "/videos/working.mov", title: "Building Something" },
];

function FeaturesHighlights() {

  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 420, behavior: "smooth" });
  };

  return (
    <section className="bg-black py-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-8 mb-16 flex items-center justify-between">

        <h2 className="text-blue-700 text-6xl font-bold">
          Get the highlights.
        </h2>

        <div className="flex gap-4">

          <button onClick={scrollLeft} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl">
            ←
          </button>

          <button onClick={scrollRight} className="w-12 h-12 rounded-full bg-[#111] text-white text-xl">
            →
          </button>

        </div>

      </div>

      <div ref={sliderRef} className="flex gap-8 overflow-x-scroll px-8 scrollbar-hide">

        {activities.map((activity, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="min-w-[360px] rounded-[32px] overflow-hidden bg-[#111]"
          >

            <video autoPlay muted loop playsInline className="w-full h-[420px] object-cover">
              <source src={activity.src} type="video/mp4" />
            </video>

            <div className="p-6">
              <p className="text-gray-400 text-sm">Activity</p>
              <p className="text-white text-xl font-semibold">{activity.title}</p>
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}

/* -------------------- DESIGN SECTION -------------------- */

function DesignSection() {
  return (
    <section className="bg-black py-40 text-center">

      <p className="text-blue-500 text-xl font-semibold mb-6">
        Design 
      </p>

      <h1 className="text-white text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">

        Just simply post follow match
        <br />
        connect and socialise

      </h1>

      <p className="text-gray-400 mt-10 text-lg max-w-3xl mx-auto leading-relaxed">

        Discover activities around you, connect with people who share your vibe,
        and build meaningful interactions through posting, following, matching
        and socialising.

      </p>

    </section>
  );
}
// Features showcase section with two video showcases and a match button overlay on an image.



function FeaturesShowcase() {
  return (
    <section className="bg-black py-40">

      {/* SECTION 1 */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 px-10 mb-40">

        {/* TEXT */}
        <div className="text-blue-500 text-5xl font-semibold">
          Match with people
who share the best
activities no only around you but also around.
        </div>

        {/* VIDEO */}
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[28px] overflow-hidden border border-white/10"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[520px] object-cover"
          >
            <source src="/videos/adventure.mov" />
          </video>
        </motion.div>

      </div>


      {/* SECTION 2 */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 px-10 mb-40">

        {/* IMAGE + MATCH */}
        <div className="relative w-full max-w-xl">

          <img
            src="/images/book.JPG"
            className="rounded-[28px] w-full border border-white/10"
          />

          {/* FLOATING MATCH BUTTON */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-6 left-1/2 -translate-x-1/2"
          >
            <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              match+
            </div>
          </motion.div>

        </div>

        {/* TEXT */}
        <div className="text-blue-500 text-5xl font-semibold">
         Private by design.
Likes, comments
and matches stay between you.
        </div>

      </div>


      {/* SECTION 3 */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20 px-10">

        {/* TEXT */}
        <div className="text-blue-500 text-5xl font-semibold">
          Let Our System help you stand out.
Smarter comments,
better prompts, stronger profiles.
We have your back!
        </div>

        {/* VIDEO */}
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-[28px] overflow-hidden border border-white/10"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[520px] object-cover"
          >
            <source src="/videos/gaming.mov" />
          </video>
        </motion.div>

      </div>

    </section>
  );
}



/* -------------------- MAIN HOME COMPONENT -------------------- */

function DesignSectionAfter() {
  return (
    <section className="bg-black py-40 text-center">

      <p className="text-blue-500 text-xl font-semibold mb-6">
        We Got Your Back
      </p>

      <h1 className="text-white text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">

      Upload Daily Activities, For Better Connections
        <br />
        ANY PROBLEM WITH SCOIALISING 
        
         <br />
        WE GOT YOUR BACK!

      </h1>

      <p className="text-blue-400 mt-10 text-lg max-w-3xl mx-auto leading-relaxed">

        noChaos is your ultimate social companion
        designed to help you connect with EVERYONE!

      </p>

    </section>
  );


}


/* -------------------- Last -------------------- */

function DesignSectionLast() {
  return (
    <section className="bg-black py-40 text-center">

      <p className="text-blue-500 text-xl font-semibold mb-6">
        noChaos
      </p>

      <h1 className="text-white text-6xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto">

      Comming Soon
        <br />
       <br />
       Share your ideas
        and help shape noChaos.


      </h1>

      <p className="text-red-400 mt-10 text-lg max-w-3xl mx-auto leading-relaxed">

        It's Not for everyone.
        Only for the right ones.
        <br />
      INVITE ONLY.

      </p>

    </section>
  );


}

/* -------------------- THREADS -------------------- */



/* -------------------- HOME -------------------- */

export default function Home() {
  return (
    <div className="bg-black">

      <TopBar />

      <HeroSection />

      <HelloSection />

      <FeaturesHighlights />

      <DesignSection />

      <FeaturesShowcase />

      <DesignSectionAfter />

      <DesignSectionLast />

      <Footer />

    </div>
  );
}