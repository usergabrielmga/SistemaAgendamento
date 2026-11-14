"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  duration: number;
  price: number;
}

export default function ServiceCard({
  title,
  description,
  duration,
  price,
}: Props) {
  return (
    <article
      className="
        flex
        flex-col
        justify-between
        rounded-2xl
        border
        border-[#F2EBE4]
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        font-sans
      "
    >
      <div>
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#F9ECE8]
          "
        >
          <Sparkles size={18} className="text-[#C47D68]" />
        </div>

        <h3
          className="
            mt-5
            text-lg
            font-bold
            tracking-tight
            text-[#2A1810]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-xs
            leading-relaxed
            text-[#7A6B63]
          "
        >
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-transparent pt-2">
        <div className="flex flex-col">
          <strong className="text-lg font-bold text-[#2A1810]">
            R$ {price.toFixed(2).replace(".", ",")}
          </strong>

          <span className="text-[11px] font-medium text-[#A0938C]">
            {duration} min
          </span>
        </div>

        <Link
          href="/agendamento"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-semibold
            text-[#C47D68]
            transition-colors
            hover:text-[#A86450]
          "
        >
          Agendar <span className="text-sm">→</span>
        </Link>
      </div>
    </article>
  );
}