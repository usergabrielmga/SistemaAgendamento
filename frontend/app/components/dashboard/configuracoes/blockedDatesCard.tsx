"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock3, Pencil, Trash2 } from "lucide-react";

import { blockedDateSchema, BlockedDateFormData } from "@/app/schemas/dashboard/blocked-date.schema";
import { BlockedDate, CreateBlockedDate } from "@/app/types/dashboard/settings.type";

interface Props {
  blockedDates: BlockedDate[];
  onCreate: (data: CreateBlockedDate) => Promise<void>;
  onUpdate: (id: number, data: CreateBlockedDate) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function BlockedDatesCard({
  blockedDates,
  onCreate,
  onUpdate,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState<BlockedDate | null>(null);

  const formatDateInput = (date: string) => date.slice(0, 10);
  const formatTimeInput = (time: string | null) => (time ? time.slice(11, 16) : "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BlockedDateFormData>({
    resolver: zodResolver(blockedDateSchema),
    defaultValues: {
      block_date: "",
      start_time: "",
      end_time: "",
      reason: "",
    },
  });

  const clearForm = (resetEditing = true) => {
    if (resetEditing) {
      setEditing(null);
    }
    reset({
      block_date: "",
      start_time: "",
      end_time: "",
      reason: "",
    });
  };

  useEffect(() => {
    if (!editing) {
      clearForm(false);
      return;
    }

    reset({
      block_date: formatDateInput(editing.block_date),
      start_time: formatTimeInput(editing.start_time),
      end_time: formatTimeInput(editing.end_time),
      reason: editing.reason ?? "",
    });
  }, [editing, reset]);

  const onSubmit = async (data: BlockedDateFormData) => {
    const payload: CreateBlockedDate = {
      block_date: data.block_date,
      start_time: data.start_time || null,
      end_time: data.end_time || null,
      reason: data.reason || "",
    };

    if (editing) {
      await onUpdate(editing.id_block, payload);
    } else {
      await onCreate(payload);
    }

    clearForm();
  };

  return (
    <div className="mx-auto w-full max-w-[860px] rounded-2xl border border-[#ECE7E3] bg-white p-5">
      <div className="mb-5">
        <h2 className="font-serif text-xl font-bold text-[#1B120D]">
          Bloquear horários
        </h2>

        <p className="mt-1 font-sans text-sm text-[#C97B63]">
          Dias ou períodos indisponíveis.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-lg bg-[#ede0d4] p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[170px_1fr]">
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-gray-500">
              Data
            </label>

            <input
              type="date"
              {...register("block_date")}
              className="h-10 w-full rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 font-sans text-sm text-black outline-none transition focus:border-[#4D2615] focus:bg-white"
            />
            {errors.block_date && (
              <span className="mt-1 block font-sans text-xs text-red-500">
                {errors.block_date.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-gray-500">
                Início
              </label>

              <input
                type="time"
                {...register("start_time")}
                className="h-10 w-full rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 font-sans text-sm text-black outline-none transition focus:border-[#4D2615] focus:bg-white"
              />
              {errors.start_time && (
                <span className="mt-1 block font-sans text-xs text-red-500">
                  {errors.start_time.message}
                </span>
              )}
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-gray-500">
                Fim
              </label>

              <input
                type="time"
                {...register("end_time")}
                className="h-10 w-full rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 font-sans text-sm text-black outline-none transition focus:border-[#4D2615] focus:bg-white"
              />
              {errors.end_time && (
                <span className="mt-1 block font-sans text-xs text-red-500">
                  {errors.end_time.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block font-sans text-xs font-medium text-gray-500">
            Motivo
          </label>

          <textarea
            rows={2}
            {...register("reason")}
            placeholder="Ex: Férias, manutenção, feriado..."
            className="w-full resize-none rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 font-sans text-sm text-black outline-none transition focus:border-[#4D2615] focus:bg-white"
          />
          {errors.reason && (
            <span className="mt-1 block font-sans text-xs text-red-500">
              {errors.reason.message}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => clearForm()}
            className="h-10 cursor-pointer rounded-lg border border-[#E5E5E5] px-5 font-sans text-sm text-black hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 cursor-pointer rounded-lg bg-[#4D2615] px-6 font-sans text-sm font-medium text-white hover:bg-[#3A1C10] disabled:opacity-60"
          >
            {editing ? "Salvar" : "Bloquear"}
          </button>
        </div>
      </form>

      <hr className="my-5 border-[#ECE7E3]" />

      <div className="space-y-3">
        {blockedDates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#E5E5E5] py-8 text-center font-sans text-sm text-gray-500">
            Nenhum bloqueio cadastrado.
          </div>
        ) : (
          blockedDates.map((item) => (
            <div
              key={item.id_block}
              className="rounded-xl border border-[#ECE7E3] bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#4D2615]">
                    <Calendar size={15} />

                    <span className="text-sm font-medium">
                      {new Date(item.block_date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock3 size={15} />

                    <span className="font-sans text-sm">
                      {item.start_time && item.end_time
                        ? `${formatTimeInput(item.start_time)} - ${formatTimeInput(
                            item.end_time
                          )}`
                        : "Dia inteiro"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {item.reason || "Sem descrição"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] transition hover:bg-[#F7F7F7]"
                  >
                    <Pencil size={15} className="cursor-pointer text-black" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item.id_block)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E5E5] text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} className="cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}