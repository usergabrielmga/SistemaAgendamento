"use client";

import { Pencil, Trash2, Scissors } from "lucide-react";

import { Services } from "@/app/types/services.type";

interface Props {
  service: Services;
  onEdit: (service: Services) => void;
  onDelete: (service: Services) => void;
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl

        px-4
        py-4

        md:px-6

        flex
        items-center
        justify-between

        hover:shadow-sm
        transition
      "
    >
      <div className="flex items-center gap-4 min-w-0">

        <div
          className="
            w-12
            h-12

            rounded-full

            bg-[#FAF4F2]

            flex
            items-center
            justify-center
          "
        >
          <Scissors
            size={18}
            className="text-[#C97B63]"
          />
        </div>

        <div className="min-w-0">

          <h2
            className="
              font-semibold
              text-sm
              md:text-base

              truncate
            "
          >
            {service.name}
          </h2>

          <p
            className="
              text-xs
              md:text-sm

              text-[#8B4513]
            "
          >
            {service.duration} min • R$ {service.price}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => onEdit(service)}
          className="
            p-2

            rounded-lg

            hover:bg-gray-100

            transition
          "
        >
          <Pencil
            size={18}
            className="text-gray-600"
          />
        </button>

        <button
          onClick={() => onDelete(service)}
          className="
            p-2

            rounded-lg

            hover:bg-red-50

            transition
          "
        >
          <Trash2
            size={18}
            className="text-gray-600 hover:text-red-500"
          />
        </button>

      </div>

    </div>
  );
}