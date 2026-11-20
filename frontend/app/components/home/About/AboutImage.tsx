"use client";

import Image from "next/image";
import imgFotoProfissional from "../../../imgs/foto_profissional.jpeg";

export default function AboutImage() {
  return (
    <div className="relative w-full">

      <Image
        src={imgFotoProfissional}
        alt="Sobre"
        width={520}
        height={640}
        className="
          w-full
          max-w-[420px]
          mx-auto
          rounded-[24px]
          sm:rounded-[32px]
          object-cover
          shadow-xl
          lg:max-w-none
        "
      />

      <div
        className="
          absolute
          right-3
          top-3
          sm:right-6
          sm:top-6
          rounded-xl
          sm:rounded-2xl
          bg-[#D89B8A]
          px-4
          py-3
          sm:px-6
          sm:py-5
          text-white
          shadow-lg
        "
      >
        <h3 className="text-2xl sm:text-3xl font-bold">
          3+
        </h3>

        <p className="text-xs sm:text-sm opacity-90">
          anos de experiência
        </p>
      </div>

    </div>
  );
}