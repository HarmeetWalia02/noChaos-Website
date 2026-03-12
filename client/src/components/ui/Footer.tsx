function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-24 pb-16 px-10 md:px-20">

      {/* Brand */}
      <div className="text-center mb-16">
        <h2 className="text-red text-2xl font-semibold">
          noChaos 2026
        </h2>
      </div>

      
      <div className="text-red-600 text-center font-bold text-4xl">
        <h1> Help Us make this app noChaos</h1>
        


      </div>

      {/* Bottom Links */}
      <div className="mt-20 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-8">
        <span>English (US)</span>
        <span>Privacy</span>
        
      </div>

    </footer>
  );
}

export default Footer;