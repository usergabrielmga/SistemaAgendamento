"use client";

export default function GalleryHeader() {
  return (
    <div className="text-center">

      <span
        className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-[#C68E7E]
        "
      >
        Galeria
      </span>

      <h2
        className="
          mt-4
          text-5xl
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
          mt-6
          max-w-2xl
          text-[17px]
          leading-8
          text-[#6D625D]
        "
      >
        Alguns dos trabalhos realizados para clientes
        que confiaram em nosso atendimento.
      </p>

    </div>
  );
}