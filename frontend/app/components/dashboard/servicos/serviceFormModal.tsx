"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Services } from "@/app/types/dashboard/services.type";

interface Props {
  open: boolean;

  service: Services | null;

  onClose: () => void;

  onSave: (
    service: Omit<Services, "id_service">
  ) => Promise<void>;

  onUpdate: (
    id: number,
    service: Omit<Services, "id_service">
  ) => Promise<void>;
}

export default function ServiceFormModal({
  open,
  service,
  onClose,
  onSave,
  onUpdate,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!service) {
      setName("");
      setDescription("");
      setDuration("30");
      setPrice("0");
      return;
    }

    setName(service.name);
    setDescription(service.description);
    setDuration(String(service.duration));
    setPrice(String(service.price));
  }, [service]);

  if (!open) return null;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Informe o nome do serviço.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name,
        description,
        duration: Number(duration),
        price: Number(price),
      };

      if (service) {
        await onUpdate(
          service.id_service,
          data
        );
      } else {
        await onSave(data);
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar serviço.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
      <div
        className="
          relative
          w-full
          max-w-[500px]
          rounded-[24px]
          bg-white
          shadow-2xl
          px-4
          py-5
          md:px-6
          md:py-6
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            text-gray-500
            hover:text-black
            transition
            cursor-pointer
          "
        >
          <X size={18} />
        </button>

        <h2
          className="
            text-xl
            md:text-2xl
            font-serif
            font-semibold
            text-[#1B120D]
          "
        >
          {service
            ? "Editar serviço"
            : "Novo serviço"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4 font-sans"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-black">
              Nome do serviço *
            </label>

            <input
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Ex: Corte Masculino"
              className="
                w-full
                h-11
                rounded-xl
                border
                border-gray-300
                px-3
                outline-none
                text-black
                focus:ring-2
                focus:ring-[#4D2615]/20
              "
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-black">
              Descrição
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-3
                py-2.5
                resize-none
                outline-none
                text-black
                focus:ring-2
                focus:ring-[#4D2615]/20
              "
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-black">
                Duração (min)
              </label>

              <input
                type="number"
                required
                value={duration}
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  rounded-xl
                  border
                  border-gray-300
                  px-3
                  outline-none
                  text-black
                  focus:ring-2
                  focus:ring-[#4D2615]/20
                "
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-black">
                Valor (R$)
              </label>

              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-10
                  rounded-xl
                  border
                  border-gray-300
                  px-3
                  outline-none
                  text-black
                  focus:ring-2
                  focus:ring-[#4D2615]/20
                "
              />
            </div>
          </div>

          <div className="flex flex-col-reverse justify-end gap-2 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                w-full
                sm:w-auto
                rounded-xl
                border
                border-gray-300
                px-5
                py-2.5
                text-black
                hover:bg-gray-50
                cursor-pointer
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                rounded-xl
                bg-[#4D2615]
                px-6
                py-2.5
                text-white
                hover:bg-[#3A1C10]
                disabled:opacity-60
                cursor-pointer
              "
            >
              {loading
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