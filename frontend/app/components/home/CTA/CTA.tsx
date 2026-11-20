"use client";

import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#3A1C12] py-16 md:py-20 lg:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 sm:px-6 text-center">

        <span
          className="
            text-[10px]
            sm:text-sm
            uppercase
            tracking-[0.35em]
            text-[#D9B7A8]
          "
        >
          Agendamento
        </span>

        <h2
          className="
            mt-4
            md:mt-6
            max-w-3xl
            text-3xl
            sm:text-4xl
            font-bold
            leading-tight
            text-white
            md:text-6xl
          "
        >
          Seu novo olhar
          <br />
          começa aqui.
        </h2>

        <p
          className="
            mt-5
            md:mt-8
            max-w-2xl
            text-sm
            sm:text-base
            md:text-lg
            leading-7
            md:leading-8
            text-[#E7D9D2]
          "
        >
          Agende seu atendimento e tenha uma experiência
          personalizada, feita especialmente para valorizar
          sua beleza natural.
        </p>

        <a
          href="/agendamento"
          className="
            mt-8
            md:mt-12
            inline-flex
            items-center
            gap-2
            md:gap-3
            rounded-full
            bg-white
            px-6
            py-3
            md:px-8
            md:py-4
            text-sm
            md:text-base
            font-semibold
            text-[#3A1C12]
            transition-all
            hover:scale-105
            hover:bg-[#F4ECE8]
          "
        >
          Agendar agora

          <ArrowRight size={18} />
        </a>

      </div>
    </section>
  );
}