"use client";

import Image from "next/image";
import imgFotoProfissional from "../../../imgs/foto_profissional.jpeg";

export default function AboutImage() {
  return (
    <div className="relative">

      <Image
        src={imgFotoProfissional}
        alt="Sobre"
        width={520}
        height={640}
        className="
          rounded-[32px]
          object-cover
          shadow-xl
        "
      />

      <div
        className="
          absolute
          right-6
          top-6
          rounded-2xl
          bg-[#D89B8A]
          px-6
          py-5
          text-white
          shadow-lg
        "
      >
        <h3 className="text-3xl font-bold">
          3+
        </h3>

        <p className="text-sm opacity-90">
          anos de experiência
        </p>
      </div>

    </div>
  );
}