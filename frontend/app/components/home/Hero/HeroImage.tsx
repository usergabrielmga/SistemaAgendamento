"use client";

import ImgVolumeFoxEyes from "../../../imgs/imgVolumeFoxEyes.jpeg";
import Image from "next/image";


export default function HeroImage() {
  return (
    <div className="relative hidden lg:block">

      <Image
        src={ImgVolumeFoxEyes}
        alt="Profissional"
        width={520}
        height={680}
        className="
          rounded-[36px]
          object-cover
          shadow-2xl
        "
      />

      <div
        className="
          absolute
          -bottom-6
          left-8
          rounded-2xl
          bg-white
          px-5
          py-4
          shadow-xl
        "
      >
        <p className="text-xs text-neutral-500">
          Avaliação
        </p>

        <strong className="text-[#3A1C12]">
          ★ 5.0 / 5.0
        </strong>
      </div>

    </div>
  );
}