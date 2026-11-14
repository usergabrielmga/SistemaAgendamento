"use client";

import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="max-w-xl">

      <span
        className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-[#D9B7A8]
        "
      >
        Design • Técnica • Beleza
      </span>

      <h1
        className="
          mt-6
          text-6xl
          font-bold
          leading-tight
          text-white
        "
      >
        Sobrancelhas que
        <br />
        definem o seu
        <br />
        olhar
      </h1>

      <p
        className="
          mt-8
          max-w-md
          text-[17px]
          leading-8
          text-[#E7D9D2]
        "
      >
        Técnicas exclusivas e design personalizado para
        realçar a sua beleza natural. Cada trabalho é
        único, como você.
      </p>

      <div className="mt-10 flex gap-5">

        <a
          href="/agendamento"
          className="
            rounded-full
            bg-[#D29A8A]
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:bg-[#BE8473]
          "
        >
          Agendar agora
        </a>

        <a
          href="#servicos"
          className="
            rounded-full
            border
            border-white/30
            px-8
            py-4
            text-white
            transition
            hover:bg-white/10
          "
        >
          Ver serviços
        </a>

      </div>

      <HeroStats />

    </div>
  );
}