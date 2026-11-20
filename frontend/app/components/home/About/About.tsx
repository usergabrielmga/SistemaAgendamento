"use client";

import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";

export default function About() {
  return (
    <section
      id="sobre"
      className="
        bg-[#FAF7F4]
        py-16
        md:py-20
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          items-center
          gap-10
          px-5
          sm:px-6
          lg:grid-cols-2
          lg:gap-20
          font-sans
        "
      >
        <AboutImage />

        <AboutContent />
      </div>
    </section>
  );
}