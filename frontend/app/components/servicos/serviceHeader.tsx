"use client";

import { Plus } from "lucide-react";

interface Props {

  onCreate: () => void;

}

export default function ServiceHeader({

  onCreate,

}: Props) {

  return (

    <div
      className="
        flex
        flex-col
        gap-4

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Serviços
      </h1>

      <button
        onClick={onCreate}
        className="
          w-full

          sm:w-auto

          h-11

          px-5

          rounded-full

          bg-[#4D2615]

          text-white

          flex
          items-center
          justify-center
          gap-2

          hover:bg-[#3A1C10]

          transition
        "
      >

        <Plus size={18} />

        Novo serviço

      </button>

    </div>

  );

}