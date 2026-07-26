"use client";

import { PiScissorsLight } from "react-icons/pi";
import { BookingService } from "../../../types/agendamento/booking.types";

interface ServiceCardProps {
  service: BookingService;
  selected: boolean;
  onSelect: (service: BookingService) => void;
}

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={`
        w-full
        rounded-2xl
        border
        bg-white
        px-5
        py-5
        text-left
        transition-all
        duration-300

        ${
          selected
            ? "border-[#8B5E3C] ring-2 ring-[#8B5E3C]/15"
            : "border-[#E8E1DA] hover:border-[#C9B4A3]"
        }
      `}
    >
      <div className="flex items-center justify-between gap-5 cursor-pointer">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl

              ${
                selected
                  ? "bg-[#8B5E3C] text-white"
                  : "bg-[#F7F2EE] text-[#C98B73]"
              }
            `}
          >
            <PiScissorsLight size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="text-[16px] font-bold text-[#2A201A] font-sans">
              {service.name}
            </h3>

            <p className="truncate text-[14px] text-[#8E8076] font-sans">
              {service.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="text-[16px] font-bold font-sans leading-none text-[#2A201A]">
            R$ {service.price.toFixed(2)}
          </span>

          <span className="mt-1 text-sm font-sans text-[#7E6D61]">
            {service.duration >= 60
              ? service.duration % 60 === 0
                ? `${service.duration / 60}h`
                : `${Math.floor(service.duration / 60)}h ${
                    service.duration % 60
                  }min`
              : `${service.duration} min`}
          </span>
        </div>
      </div>
    </button>
  );
}