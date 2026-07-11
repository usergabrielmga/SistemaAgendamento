"use client";

import { useState } from "react";

import useClients from "@/app/hooks/useClient";

import ClientSearch from "@/app/components/clientes/clientSearch";
import ClientList from "@/app/components/clientes/clientList";
import ClientModal from "@/app/modals/clientModal";

export default function ClientsPage() {

  const {
    search,
    setSearch,
    filteredClients,
  } = useClients();

  const [selectedClient, setSelectedClient] =
    useState<any | null>(null);

  const [open, setOpen] =
    useState(false);

  return (
    <main className="w-full max-w-5xl space-y-8">

      <h1 className="text-3xl font-bold text-black">
        Clientes
      </h1>

      <ClientSearch
        value={search}
        onChange={setSearch}
      />

      <ClientList
        clients={filteredClients}
        onSelect={(client) => {
          setSelectedClient(client);
          setOpen(true);
        }}
      />

      <ClientModal
        client={selectedClient}
        open={open}
        onClose={() => setOpen(false)}
      />

    </main>
  );
}