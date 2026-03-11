import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Sparkles, Users, Shield, Zap, Star, ChevronDown, ArrowRight, Send, CheckCircle } from "lucide-react";

const SECTIONS = ["Home", "About Us", "Feedback"];

function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const handler = () => {
      const sects = ["home", "about", "feedback"];
      const labels = ["Home", "About Us", "Feedback"];
      let found = "Home";
      for (let i = sects.length - 1; i >= 0; i--) {
        const el = document.getElementById(sects[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) { found = labels[i]; break; }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useScrollSpy();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navIds: Record<string, string> = {
    "Home": "home",
    "About Us": "about",
    "Feedback": "feedback",
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#07080f]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("home")}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a6cff] to-[#4d3fff] flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Heart className="w-4.5 h-4.5 text-white fill-white" size={18} />
          </div>
          <span className="font-serif font-bold text-xl text-white tracking-tight">
            Aura
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              data-testid={`nav-${s.toLowerCase().replace(" ", "-")}`}
              onClick={() => scrollTo(navIds[s])}
              className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                active === s
                  ? "text-white"
                  : "text-white/60 hover:text-white/90"
              }`}
            >
              {active === s && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/[0.12]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{s}</span>
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            data-testid="btn-login"
            className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            Log in
          </button>
          <motion.button
            data-testid="btn-get-started"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px hsl(222 90% 58% / 0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#1a6cff] to-[#4d3fff] hover:from-[#2677ff] to-[#5546ff] transition-all duration-200 shadow-lg shadow-blue-500/25"
          >
            Get Started
          </motion.button>
        </div>

        <button
          data-testid="btn-mobile-menu"
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#07080f]/95 backdrop-blur-xl px-6 pb-6"
          >
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { scrollTo(navIds[s]); setMobileOpen(false); }}
                className="block w-full text-left py-3.5 text-white/75 hover:text-white font-medium transition-colors border-b border-white/[0.06] last:border-0"
              >
                {s}
              </motion.button>
            ))}
            <div className="pt-4 flex gap-3">
              <button className="flex-1 py-2.5 text-sm font-medium text-white/70 border border-white/10 rounded-full">Log in</button>
              <button className="flex-1 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#1a6cff] to-[#4d3fff]">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07080f]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-indigo-600/15 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,108,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,108,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/8 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">The Future of Connection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.04] tracking-tight mb-6"
            >
              Where
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] via-[#6d9fff] to-[#4d3fff]">
                Souls Meet
              </span>
              <span className="block">Brilliance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg text-white/55 leading-relaxed mb-10 max-w-md font-light"
            >
              Aura reimagines how extraordinary people connect — blending the depth of social discovery with the electricity of genuine human chemistry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                data-testid="btn-hero-download"
                whileHover={{ scale: 1.04, boxShadow: "0 0 50px hsl(222 90% 58% / 0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-[#1a6cff] to-[#4d3fff] shadow-xl shadow-blue-500/30 transition-all duration-300"
              >
                Download Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                data-testid="btn-hero-watch"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white/70 hover:text-white rounded-2xl border border-white/12 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
              >
                Watch Story
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-8 mt-12"
            >
              <div>
                <div className="text-3xl font-bold text-white font-serif">4.9<span className="text-blue-400">★</span></div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">App Store</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-white font-serif">2.4M+</div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">Members</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-3xl font-bold text-white font-serif">98%</div>
                <div className="text-xs text-white/40 mt-0.5 uppercase tracking-wider">Satisfaction</div>
              </div>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 rounded-[3rem] blur-2xl" />
              <div className="relative animate-float">
                <PhoneMockup imageSrc="/images/iphone-mockup-1.png" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="absolute -left-16 top-1/4 bg-[#0f1420]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3.5 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white">M</div>
                  <div>
                    <div className="text-xs font-semibold text-white">New Match!</div>
                    <div className="text-xs text-white/40">Maya liked your profile</div>
                  </div>
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse ml-1" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                className="absolute -right-16 bottom-1/3 bg-[#0f1420]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3.5 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/70">847 online now</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollTo("features")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
}

function PhoneMockup({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative w-[280px] lg:w-[320px]">
      <div className="relative rounded-[42px] overflow-hidden border-2 border-white/[0.12] shadow-[0_0_100px_hsl(222_90%_58%/0.25),0_40px_80px_rgba(0,0,0,0.6)] bg-[#0a0b15]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#07080f] rounded-b-2xl z-10 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-12 h-1.5 rounded-full bg-white/10" />
        </div>
        <img
          src={imageSrc}
          alt="Aura App Mockup"
          className="w-full h-auto object-cover"
          style={{ aspectRatio: "9/19.5" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b15]/40 via-transparent to-[#0a0b15]/20 pointer-events-none" />
      </div>
      <div className="absolute -right-4 top-16 w-1.5 h-10 bg-white/8 rounded-full" />
      <div className="absolute -left-4 top-24 w-1.5 h-7 bg-white/8 rounded-full" />
      <div className="absolute -left-4 top-36 w-1.5 h-7 bg-white/8 rounded-full" />
    </div>
  );
}

const FEATURES = [
  {
    icon: Sparkles,
    color: "from-blue-500 to-indigo-600",
    glow: "blue",
    title: "AI-Powered Matching",
    desc: "Our proprietary algorithm analyzes hundreds of compatibility signals to surface connections that truly resonate — beyond surface-level preferences.",
  },
  {
    icon: Shield,
    color: "from-violet-500 to-purple-600",
    glow: "violet",
    title: "Verified & Private",
    desc: "Every profile is verified. Your data is yours. Military-grade encryption and strict privacy controls give you total confidence.",
  },
  {
    icon: MessageCircle,
    color: "from-cyan-500 to-blue-600",
    glow: "cyan",
    title: "Rich Conversations",
    desc: "Break the ice with interactive prompts, voice notes, and exclusive reactions. Conversations that flow as naturally as real life.",
  },
  {
    icon: Users,
    color: "from-pink-500 to-rose-600",
    glow: "pink",
    title: "Social Discovery",
    desc: "Join circles of like-minded people, attend curated events, and build a social life that organically turns connections into bonds.",
  },
  {
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    glow: "amber",
    title: "Instant Spark",
    desc: "When both of you express mutual interest simultaneously, feel the electric rush of an Instant Spark — real-time connection magic.",
  },
  {
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    glow: "rose",
    title: "Relationship Intelligence",
    desc: "Aura learns what makes your relationships thrive and gently guides you toward deeper, more meaningful partnerships.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 bg-[#07080f] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-900/8 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/6 mb-6">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">Features</span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Engineered for
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] to-[#8b5cf6]"> Extraordinary</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Every feature is crafted to bring you closer to genuine, lasting connections — with elegance at every step.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <FadeUp key={feat.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, borderColor: "rgba(26,108,255,0.25)" }}
                  className="group relative p-7 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm cursor-default overflow-hidden transition-all duration-400"
                  data-testid={`feature-card-${i}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 group-hover:from-blue-600/5 to-transparent transition-all duration-400 rounded-3xl" />
                  <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-5.5 h-5.5 text-white" size={22} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">{feat.desc}</p>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AppShowcaseSection() {
  return (
    <section className="relative py-32 bg-[#07080f] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/15 to-transparent rounded-full blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-3xl overflow-hidden aspect-[16/9] border border-white/8">
                  <img
                    src="/images/diverse-people.png"
                    alt="Diverse people connecting on Aura"
                    className="w-full h-full object-cover"
                    data-testid="img-diverse-people"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-square border border-white/8">
                  <img
                    src="/images/couple-app.png"
                    alt="Couple connecting on Aura"
                    className="w-full h-full object-cover"
                    data-testid="img-couple-app"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-square border border-white/8 bg-gradient-to-br from-blue-900/30 to-indigo-900/20 flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-5xl font-serif font-bold text-white mb-2">127K</div>
                  <div className="text-white/50 text-sm font-light">New couples formed this month</div>
                  <div className="flex mt-4 -space-x-2">
                    {["from-pink-400 to-rose-500", "from-blue-400 to-indigo-500", "from-violet-400 to-purple-500", "from-amber-400 to-orange-500"].map((g, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-[#07080f] flex items-center justify-center text-xs font-bold text-white`}>
                        {["J","S","K","M"][i]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/6 mb-6">
              <Heart className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">Real Stories</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Built for
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] to-[#8b5cf6]"> Every Kind</span>
              <span className="block">of Love</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed font-light">
              Aura celebrates diversity in every form. Our community spans cultures, backgrounds, and orientations — all united by the universal desire for genuine connection.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { stat: "180+", label: "Countries" },
                { stat: "4.9★", label: "Average Rating" },
                { stat: "2.4M+", label: "Active Members" },
                { stat: "99.7%", label: "Uptime" },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]" data-testid={`stat-${i}`}>
                  <div className="font-serif text-2xl font-bold text-white mb-1">{item.stat}</div>
                  <div className="text-white/40 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
            <motion.button
              data-testid="btn-learn-more"
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px hsl(222 90% 58% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#1a6cff] to-[#4d3fff] shadow-lg shadow-blue-500/25"
            >
              Discover More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-[#07080f] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-900/12 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/6 mb-6">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">About Us</span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            A Team Obsessed With
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] to-[#8b5cf6]"> Human Depth</span>
          </h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Aura was founded by a group of designers, engineers, and psychologists who believed that technology could make the most human experience — falling in love — feel more magical, not more transactional.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: "🎯",
              title: "Our Mission",
              desc: "To render loneliness obsolete. We build tools that help people find their people — whether that's a soulmate, a best friend, or a creative partner.",
            },
            {
              icon: "✨",
              title: "Our Philosophy",
              desc: "Genuine connection doesn't happen by swiping left or right. It emerges from thoughtful design, deep listening, and technology that steps back at the right moment.",
            },
            {
              icon: "🌍",
              title: "Our Impact",
              desc: "Over 127,000 couples have formed through Aura. Thousands of friendships, collaborations, and life-changing conversations happen on our platform every day.",
            },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-8 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm"
                data-testid={`about-card-${i}`}
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.07]">
            <img
              src="/images/hero-person.png"
              alt="Aura experience"
              className="w-full h-64 lg:h-96 object-cover object-top opacity-70"
              data-testid="img-about-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080f] via-[#07080f]/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 lg:px-20">
              <div className="max-w-lg">
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                  "We don't just build software. We architect the conditions for love to happen."
                </h3>
                <p className="text-white/50 text-sm font-light">— Founders of Aura</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Amara N.",
    role: "Graphic Designer, Lagos",
    avatar: "A",
    gradient: "from-pink-500 to-rose-600",
    stars: 5,
    text: "I met my fiancé on Aura six months ago. The matching felt almost supernatural — like the app truly understood what I was looking for beyond just my checklist.",
  },
  {
    name: "James K.",
    role: "Engineer, Seoul",
    avatar: "J",
    gradient: "from-blue-500 to-indigo-600",
    stars: 5,
    text: "After years of feeling like social apps were built for someone else, Aura felt like it was made for me. The conversations here are genuinely different — deeper and more real.",
  },
  {
    name: "Sofia L.",
    role: "Writer, Buenos Aires",
    avatar: "S",
    gradient: "from-violet-500 to-purple-600",
    stars: 5,
    text: "I wasn't even looking for romance — I found a creative writing partner who became my closest friend. Aura understands that connection takes many forms.",
  },
  {
    name: "Malik B.",
    role: "Architect, Paris",
    avatar: "M",
    gradient: "from-amber-500 to-orange-600",
    stars: 5,
    text: "The design alone makes you feel luxurious. But it's the calibre of people on the platform that keeps me here. Genuinely exceptional human beings.",
  },
  {
    name: "Yuki T.",
    role: "Photographer, Tokyo",
    avatar: "Y",
    gradient: "from-teal-500 to-cyan-600",
    stars: 5,
    text: "Aura doesn't feel like a dating app. It feels like a private club for people who take their relationships seriously. I've never felt safer on any platform.",
  },
  {
    name: "Priya R.",
    role: "Doctor, Mumbai",
    avatar: "P",
    gradient: "from-rose-500 to-pink-600",
    stars: 5,
    text: "Three years of Aura and I've built an entire life here. Met my partner, found my best friends, grew professionally. It's more than an app — it's a community.",
  },
];

function FeedbackSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="feedback" className="relative py-32 bg-[#07080f] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/6 mb-6">
            <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">Feedback</span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Voices From Our
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] to-[#8b5cf6]"> Community</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Real stories from real members whose lives were transformed by genuine connection.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(26,108,255,0.2)" }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group p-7 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm cursor-default transition-all duration-300"
                data-testid={`testimonial-card-${i}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 group-hover:from-blue-600/4 to-transparent transition-all duration-400 rounded-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-1 mb-5">
                    {Array(t.stars).fill(null).map((_, si) => (
                      <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 font-light italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{t.name}</div>
                      <div className="text-white/40 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-serif text-4xl font-bold text-white mb-4 leading-snug">
                Share Your
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] to-[#8b5cf6]"> Experience</span>
              </h3>
              <p className="text-white/50 leading-relaxed mb-8 font-light">
                Your feedback shapes the future of Aura. Whether you have a love story to share, a feature request, or a thought about how we can serve you better — we want to hear it.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: "Every submission is read by our team" },
                  { icon: CheckCircle, text: "Feature requests often make it into our roadmap" },
                  { icon: CheckCircle, text: "Response within 48 hours for all messages" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" size={18} />
                      <span className="text-white/60 text-sm font-light">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-transparent rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-white mb-3">Thank You!</h4>
                      <p className="text-white/50 font-light">Your message has been received. We'll be in touch soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-white/40 font-medium mb-2 uppercase tracking-wider">Name</label>
                          <input
                            data-testid="input-feedback-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/25 text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/40 font-medium mb-2 uppercase tracking-wider">Email</label>
                          <input
                            data-testid="input-feedback-email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/25 text-sm transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 font-medium mb-2 uppercase tracking-wider">Message</label>
                        <textarea
                          data-testid="input-feedback-message"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Share your story or send us a message..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-white placeholder-white/25 text-sm resize-none transition-all"
                        />
                      </div>
                      <motion.button
                        data-testid="btn-feedback-submit"
                        type="submit"
                        whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(222 90% 58% / 0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#1a6cff] to-[#4d3fff] shadow-lg shadow-blue-500/25 transition-all duration-200"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-[#07080f] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[300px] rounded-full bg-blue-600/12 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/6 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-widest uppercase">Ready to Begin?</span>
          </div>
          <h2 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your Story
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#1a6cff] via-[#6d9fff] to-[#8b5cf6]"> Starts</span>
            <span className="block">Here</span>
          </h2>
          <p className="text-white/50 text-xl mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Join over 2.4 million people who chose to invest in the quality of their connections. Download Aura today — free, always.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              data-testid="btn-cta-appstore"
              whileHover={{ scale: 1.04, boxShadow: "0 0 60px hsl(222 90% 58% / 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#1a6cff] to-[#4d3fff] shadow-xl shadow-blue-500/30"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </motion.button>
            <motion.button
              data-testid="btn-cta-playstore"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white rounded-2xl border border-white/12 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.31.17.67.19 1.01.07l12.47-7.23-2.62-2.62-10.86 9.78zm-1.11-20.2A1.86 1.86 0 002 4.74v14.52c0 .55.23 1.04.62 1.4l.08.07 8.14-8.14v-.19L2.07 3.56zm17.05 9.23l-2.35-1.36-2.9 2.9 2.9 2.9 2.37-1.37a1.86 1.86 0 000-3.07zm-16-9.03l10.86 9.79 2.62-2.62L4.13.77c-.34-.12-.7-.1-1.01.08-.63.36-.96 1.06-.89 1.91z" />
              </svg>
              Google Play
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/[0.05] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a6cff] to-[#4d3fff] flex items-center justify-center">
                <Heart className="w-4.5 h-4.5 text-white fill-white" size={18} />
              </div>
              <span className="font-serif font-bold text-xl text-white">Aura</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Where extraordinary people find extraordinary connections. Built with love, obsessed with depth.
            </p>
          </div>
          <div>
            <h4 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Security", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors font-light">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors font-light">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm font-light">© 2026 Aura. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-white/25 text-sm hover:text-white/50 transition-colors font-light">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07080f] dark">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AppShowcaseSection />
        <AboutSection />
        <FeedbackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
