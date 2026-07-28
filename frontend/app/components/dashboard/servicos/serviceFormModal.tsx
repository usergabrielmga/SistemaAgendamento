"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { toast } from "sonner";

import { serviceSchema, ServiceFormData } from "@/app/schemas/dashboard/service.schema";
import { Services } from "@/app/types/dashboard/services.type";

interface Props {
  open: boolean;
  service: Services | null;
  onClose: () => void;
  onSave: (service: Omit<Services, "id_service">) => Promise<void>;
  onUpdate: (id: number, service: Omit<Services, "id_service">) => Promise<void>;
}

export default function ServiceFormModal({
  open,
  service,
  onClose,
  onSave,
  onUpdate,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 30,
      price: 0,
    },
  });

  useEffect(() => {
    if (!service) {
      reset({
        name: "",
        description: "",
        duration: 30,
        price: 0,
      });
      return;
    }

    reset({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
    });
  }, [service, reset]);

  if (!open) return null;

  async function onSubmit(data: ServiceFormData) {
    try {
      if (service) {
        await onUpdate(service.id_service, data);
        toast.success("Serviço atualizado com sucesso.");
      } else {
        await onSave(data);
        toast.success("Serviço cadastrado com sucesso.");
      }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar serviço.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
      <div className="relative w-full max-w-[500px] rounded-[24px] bg-white shadow-2xl px-4 py-5 md:px-6 md:py-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#1B120D]">
          {service ? "Editar serviço" : "Novo serviço"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4 font-sans">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-black">
              Nome do serviço *
            </label>

            <input
              {...register("name")}
              placeholder="Ex: Corte Masculino"
              className="w-full h-11 rounded-xl border border-gray-300 px-3 outline-none text-black focus:ring-2 focus:ring-[#4D2615]/20"
            />
            {errors.name && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-black">
              Descrição
            </label>

            <textarea
              rows={3}
              {...register("description")}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 resize-none outline-none text-black focus:ring-2 focus:ring-[#4D2615]/20"
            />
            {errors.description && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-black">
                Duração (min)
              </label>

              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className="w-full h-10 rounded-xl border border-gray-300 px-3 outline-none text-black focus:ring-2 focus:ring-[#4D2615]/20"
              />
              {errors.duration && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.duration.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-black">
                Valor (R$)
              </label>

              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="w-full h-10 rounded-xl border border-gray-300 px-3 outline-none text-black focus:ring-2 focus:ring-[#4D2615]/20"
              />
              {errors.price && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-2 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xl border border-gray-300 px-5 py-2.5 text-black hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xl bg-[#4D2615] px-6 py-2.5 text-white hover:bg-[#3A1C10] disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting
                ? "Salvando..."
                : service
                ? "Atualizar"
                : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}