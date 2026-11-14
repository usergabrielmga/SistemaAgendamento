"use client";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#4B2515]
      "
    >
      {/* Background escurecido */}
      <div className="absolute inset-0 bg-black/35" />

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[760px]
          max-w-7xl
          items-center
          justify-between
          gap-20
          px-6
          py-24
          font-sans
        "
      >
        <HeroContent />

        <HeroImage />
      </div>
    </section>
  );
}