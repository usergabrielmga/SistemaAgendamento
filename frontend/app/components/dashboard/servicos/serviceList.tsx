"use client";

import ServiceCard from "./serviceCard";

import { Services } from "@/app/types/dashboard/services.type";

interface Props {
  services: Services[];
  loading: boolean;

  onEdit: (service: Services) => void;

  onDelete?: (service: Services) => void;
}

export default function ServiceList({
  services,
  loading,
  onEdit,
  onDelete = () => {},
}: Props) {
  if (loading) {
    return (
      <div
        className="
          bg-white

          rounded-3xl

          border

          py-10

          text-center

          text-gray-500
        "
      >
        Carregando serviços...
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div
        className="
          bg-white

          rounded-3xl

          border

          py-10

          text-center

          text-gray-500
        "
      >
        Nenhum serviço cadastrado.
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {services.map((service) => (

        <ServiceCard
          key={service.id_service}
          service={service}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>
  );
}