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

function Feedback() {
  return (
    <div className="bg-black min-h-screen text-white px-8 py-32">

      <div className="max-w-4xl mx-auto text-center">

        <p className="text-blue-500 text-lg mb-6">
          Feedback
        </p>

        <h1 className="text-6xl font-bold mb-10">
          Help shape noChaos.
        </h1>

        <p className="text-gray-400 text-lg mb-16">
          You're a little early. Tell us what you want to see next.
        </p>

      </div>

      {/* FORM */}

      <form
        action="https://formspree.io/f/mvzwrpqd"
        method="POST"
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="bg-[#111] border border-white/10 rounded-xl p-4 text-white outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="bg-[#111] border border-white/10 rounded-xl p-4 text-white outline-none"
        />

        <textarea
          name="message"
          placeholder="Your feedback..."
          required
          className="bg-[#111] border border-white/10 rounded-xl p-6 text-white h-40 outline-none"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition rounded-full py-3 px-6 text-white font-semibold"
        >
          Send Feedback
        </button>

      </form>

    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-black">

      <TopBar />

      <Feedback />

      <Footer />

    </div>
  );
}