"use client";

import ServicesHeader from "./ServicesHeader";
import ServiceGrid from "./ServiceGrid";

export default function Services() {
  return (
    <section
      id="servicos"
      className="
        bg-[#F3EBE3]
        py-28
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6
        "
      >
        <ServicesHeader />
        <ServiceGrid />
      </div>
    </section>
  );
}