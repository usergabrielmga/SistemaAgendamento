"use client";

import { Client } from "@/app/types/dashboard/client.type";
import { UserRound, ChevronRight } from "lucide-react";

interface Props {
  client: Client;
  onClick: () => void;
}

export default function ClientCard({
    client,
    onClick,
}: Props) {
  return (
    <button
    onClick={onClick}
      className="
        w-full
        flex
        items-center
        justify-between

        px-4
        py-4
        font-sans
        md:px-6
        hover:bg-gray-50
        transition
        cur
      "
    >

      <div className="flex items-center gap-4 ">

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
          <UserRound
            size={20}
            className="text-[#C97B63]"
          />
        </div>

        <div className="text-left">

          <h3 className="font-semibold text-black text-sm">
            {client.name}
          </h3>

          <p className="text-[#8B4513] font-sm text-sm ">
            {client.telephone}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-4">

        

        <ChevronRight
          size={18}
          className="text-gray-400"
        />

      </div>

    </button>
  );
}