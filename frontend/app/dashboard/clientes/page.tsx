"use client";

import { useState } from "react";

import useClients from "@/app/hooks/dashboard/useClient";

import ClientSearch from "@/app/components/dashboard/clientes/clientSearch";
import ClientList from "@/app/components/dashboard/clientes/clientList";
import ClientModal from "@/app/modals/dashboard/clientModal";

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

      <h1 className="text-[30px] font-semibild font-serif text-black">
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