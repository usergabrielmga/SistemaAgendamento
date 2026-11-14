"use client";

import GalleryHeader from "./GalleryHeader";
import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="bg-[#FAF7F4] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <GalleryHeader />

        <GalleryGrid />
      </div>
    </section>
  );
}