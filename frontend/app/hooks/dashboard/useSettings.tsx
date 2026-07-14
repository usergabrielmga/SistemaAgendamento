"use client";

import { useEffect, useState } from "react";

import {
  BlockedDate,
  CreateBlockedDate,
} from "../../types/dashboard/settings.type";

import {
  getBlockedDates,
  createBlockedDate,
  updateBlockedDate,
  deleteBlockedDate,
} from "../../services/dashboard/settings.service";

export default function useSettings() {

  const [blockedDates, setBlockedDates] =
    useState<BlockedDate[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBlockedDates();
  }, []);

  async function loadBlockedDates() {

    setLoading(true);

    try {

      const data =
        await getBlockedDates();

      setBlockedDates(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function create(
    data: CreateBlockedDate
  ) {

    await createBlockedDate(data);

    await loadBlockedDates();

  }

  async function update(
    id: number,
    data: CreateBlockedDate
  ) {

    await updateBlockedDate(
      id,
      data
    );

    await loadBlockedDates();

  }

  async function remove(
    id: number
  ) {

    await deleteBlockedDate(id);

    await loadBlockedDates();

  }

  return {

    blockedDates,

    loading,

    createBlockedDate: create,

    updateBlockedDate: update,

    deleteBlockedDate: remove,

    reload: loadBlockedDates,

  };

}