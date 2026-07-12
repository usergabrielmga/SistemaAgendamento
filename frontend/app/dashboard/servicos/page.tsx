"use client";

import { useState } from "react";

import useServices from "@/app/hooks/useServices";

import ServiceHeader from "@/app/components/servicos/serviceHeader";
import ServiceList from "@/app/components/servicos/serviceList";
import ServiceFormModal from "@/app/components/servicos/serviceFormModal";

import { Services } from "@/app/types/services.type";

export default function ServicesPage() {

  const {
    services,
    loading,
    create,
    update,
    remove,
  } = useServices();

  const [open, setOpen] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState<Services | null>(null);

  function handleCreate() {

    setSelectedService(null);

    setOpen(true);

  }

  function handleEdit(
    service: Services
  ) {

    setSelectedService(service);

    setOpen(true);

  }

  async function handleDelete(
    service: Services
  ) {

    const confirmDelete = window.confirm(
      `Deseja excluir o serviço "${service.name}"?`
    );

    if (!confirmDelete) return;

    try {

      await remove(
        service.id_service
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao excluir serviço."
      );

    }

  }

  async function handleCreateService(
    data: Omit<
      Services,
      "id_service"
    >
  ) {

    try {

      await create(data);

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao cadastrar serviço."
      );

    }

  }

  async function handleUpdateService(
    id: number,
    data: Omit<
      Services,
      "id_service"
    >
  ) {

    try {

      await update(
        id,
        data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao atualizar serviço."
      );

    }

  }

  return (

    <main className="w-full max-w-5xl space-y-8">

      <ServiceHeader
        onCreate={handleCreate}
      />

      <ServiceList
        loading={loading}
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ServiceFormModal
        open={open}
        service={selectedService}
        onClose={() => {
          setOpen(false);
          setSelectedService(null);
        }}
        onSave={handleCreateService}
        onUpdate={handleUpdateService}
      />
      

    </main>

  );

}