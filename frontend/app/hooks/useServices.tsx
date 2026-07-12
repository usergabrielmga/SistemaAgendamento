"use client";

import { useEffect, useState } from "react";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/services.service";

import { Services } from "../types/services.type";

export default function useServices() {

  const [services, setServices] =
    useState<Services[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {

    setLoading(true);

    try {

      const data =
        await getServices();

      setServices(data);

    } catch (error) {

      console.error(
        "Erro ao carregar serviços:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  async function create(
    service: Omit<Services, "id_service">
  ) {

    await createService(service);

    await load();

  }

  async function update(
    id_service: number,
    service: Omit<Services, "id_service">
  ) {

    await updateService(
      id_service,
      service
    );

    await load();

  }

  async function remove(
    id_service: number
  ) {

    await deleteService(
      id_service
    );

    await load();

  }

  return {

    services,

    loading,

    create,

    update,

    remove,

    reload: load,

  };

}