"use client";

import Image from "next/image";

interface Props {
  image: string;
}

export default function GalleryCard({
  image,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        group
      "
    >
      <Image
        src={image}
        alt="Trabalho realizado"
        width={300}
        height={400}
        className="
          h-[420px]
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />
    </div>
  );
}