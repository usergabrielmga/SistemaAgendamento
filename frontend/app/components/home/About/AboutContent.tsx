"use client";

import AboutFeatures from "./AboutFeatures";

export default function AboutContent() {
  return (
    <div>

      <span
        className="
          text-[10px]
          sm:text-xs
          uppercase
          tracking-[0.35em]
          text-[#C68E7E]
        "
      >
        Sobre mim
      </span>

      <h2
        className="
          mt-3
          sm:mt-4
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          leading-tight
          text-[#2F1A11]
        "
      >
        Paixão por
        <br />
        realçar a beleza
        <br />
        natural
      </h2>

      <p
        className="
          mt-5
          sm:mt-8
          text-sm
          sm:text-base
          lg:text-[17px]
          leading-7
          lg:leading-8
          text-[#6E625C]
        "
      >
        Sou designer de sobrancelhas apaixonada pelo que faço.
        Cada atendimento é pensado para valorizar seus traços,
        respeitando sua beleza natural e proporcionando uma
        experiência acolhedora.
      </p>

      <p
        className="
          mt-4
          sm:mt-6
          text-sm
          sm:text-base
          lg:text-[17px]
          leading-7
          lg:leading-8
          text-[#6E625C]
        "
      >
        Trabalho com técnicas modernas, produtos de qualidade
        e um atendimento totalmente personalizado para cada cliente.
      </p>

      <AboutFeatures />

    </div>
  );
}