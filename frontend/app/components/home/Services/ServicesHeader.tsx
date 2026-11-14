"use client";

export default function ServicesHeader() {
  return (
    <div className="text-center font-sans">
      {/* Tag superior em caixa alta e tom rosé pastel */}
      <span
        className="
          text-xs
          font-semibold
          uppercase
          tracking-widest
          text-[#C47D68]
        "
      >
        • O QUE OFEREÇO •
      </span>

      {/* Título principal com tipografia ajustada e tom marrom escuro */}
      <h2
        className="
          mt-2
          text-3xl
          font-bold
          tracking-tight
          text-[#2A1810]
          sm:text-4xl
        "
      >
        Serviços especializados
      </h2>
    </div>
  );
}