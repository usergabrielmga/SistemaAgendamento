"use client";

export default function HeroStats() {
  return (
    <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-wrap gap-6 sm:gap-10 lg:gap-12">

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          500+
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-[#D5C4BD]">
          Clientes atendidas
        </p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          5★
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-[#D5C4BD]">
          Avaliação média
        </p>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          3 anos
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-[#D5C4BD]">
          De experiência
        </p>
      </div>

    </div>
  );
}