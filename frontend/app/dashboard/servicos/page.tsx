"use client";

import { useState } from "react";

import useServices from "@/app/hooks/dashboard/useServices";

import ServiceHeader from "@/app/components/dashboard/servicos/serviceHeader";
import ServiceList from "@/app/components/dashboard/servicos/serviceList";
import ServiceFormModal from "@/app/components/dashboard/servicos/serviceFormModal";
import ConfirmModal from "@/app/modals/dashboard/ConfirmModal"

import { Services } from "@/app/types/dashboard/services.type";

export default function ServicesPage() {
  const {
    services,
    loading,
    create,
    update,
    remove,
  } = useServices();

  const [open, setOpen] = useState(false);

  const [selectedService, setSelectedService] =
    useState<Services | null>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [serviceToDelete, setServiceToDelete] =
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

  function handleDelete(
    service: Services
  ) {
    setServiceToDelete(service);
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!serviceToDelete) return;

    try {
      await remove(
        serviceToDelete.id_service
      );

      setConfirmOpen(false);
      setServiceToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateService(
    data: Omit<
      Services,
      "id_service"
    >
  ) {
    await create(data);
  }

  async function handleUpdateService(
    id: number,
    data: Omit<
      Services,
      "id_service"
    >
  ) {
    await update(
      id,
      data
    );
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

      <ConfirmModal
        open={confirmOpen}
        title="Excluir serviço?"
        description={`Deseja realmente excluir o serviço "${serviceToDelete?.name}"? Esta ação não poderá ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onClose={() => {
          setConfirmOpen(false);
          setServiceToDelete(null);
        }}
      />
    </main>
  );
}