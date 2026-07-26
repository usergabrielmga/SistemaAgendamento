"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface BookingHeaderProps {
  onBack?: () => void;
}

export default function BookingHeader({
  onBack,
}: BookingHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-neutral-200">
      <div className="mx-auto flex h-20 max-w-md items-center px-5">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
        >
          <ArrowLeft className="text-[#3a1c12] cursor-pointer" size={22} />
        </button>

        <div className="flex flex-col items-center">

          <span className="mt-1 ml-5 text-[22px] font-bold tracking-[0.25rem] text-[#3a1c12] font-serif">
            JENYFER
          </span>
        </div>

        <div className="w-10" />
      </div>
    </header>
  );
}