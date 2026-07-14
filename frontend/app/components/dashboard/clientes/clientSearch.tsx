"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ClientSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Pesquisar por nome ou telefone..."
        className="
          w-full
          h-12
          rounded-2xl
          border
          bg-white
          pl-11
          pr-4
          outline-none
          focus:ring-2
          focus:ring-[#4D2615]/20
        "
      />

    </div>
  );
}