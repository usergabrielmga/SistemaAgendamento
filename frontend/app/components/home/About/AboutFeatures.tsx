"use client";

import { CheckCircle2 } from "lucide-react";

const features = [
  "Design personalizado",
  "Produtos premium",
  "Ambiente higienizado",
  "Atendimento humanizado",
];

export default function AboutFeatures() {
  return (
    <div
      className="
        mt-7
        sm:mt-10
        grid
        grid-cols-1
        gap-3
        sm:grid-cols-2
        sm:gap-5
      "
    >
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-center gap-2 sm:gap-3"
        >
          <CheckCircle2
            size={18}
            className="shrink-0 text-[#C68E7E]"
          />

          <span className="text-sm sm:text-base text-[#554C47]">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}