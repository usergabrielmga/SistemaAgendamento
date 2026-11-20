"use client";

export default function GalleryHeader() {
  return (
    <div className="text-center">

      <span
        className="
          text-[10px]
          sm:text-xs
          uppercase
          tracking-[0.35em]
          text-[#C68E7E]
        "
      >
        Galeria
      </span>

      <h2
        className="
          mt-3
          sm:mt-4
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          text-[#2E170D]
        "
      >
        Resultados que falam
        por si
      </h2>

      <p
        className="
          mx-auto
          mt-4
          sm:mt-6
          max-w-2xl
          text-sm
          sm:text-base
          lg:text-[17px]
          leading-7
          lg:leading-8
          text-[#6D625D]
        "
      >
        Alguns dos trabalhos realizados para clientes
        que confiaram em nosso atendimento.
      </p>

    </div>
  );
}