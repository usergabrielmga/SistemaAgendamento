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
        mt-10
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
      "
    >
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-center gap-3"
        >
          <CheckCircle2
            size={18}
            className="text-[#C68E7E]"
          />

          <span className="text-[#554C47]">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}