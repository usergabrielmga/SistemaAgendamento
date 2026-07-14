"use client";

import useSettings from "@/app/hooks/dashboard/useSettings";
import useWorkingHours from "@/app/hooks/dashboard/useWorkingHours";

import WorkingDaysCard from "@/app/components/dashboard/configuracoes/workingDaysCard";
import BlockedDatesCard from "@/app/components/dashboard/configuracoes/blockedDatesCard";

export default function SettingsPage() {

  const {
    workingHours,
    save,
    loading: loadingWorkingHours,
  } = useWorkingHours();

  const {
    blockedDates,
    loading: loadingBlockedDates,
    createBlockedDate,
    updateBlockedDate,
    deleteBlockedDate,
  } = useSettings();

  if (loadingWorkingHours || loadingBlockedDates) {
    return (
      <main className="w-full max-w-5xl">
        <div className="rounded-3xl border bg-white p-10 text-center">
          Carregando...
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-5xl space-y-8">

      <div>

        <h1 className="font-serif text-3xl font-semibold text-[#1B120D]">
          Configurações
        </h1>

        <p className="mt-2 font-sans text-gray-500">
          Configure os dias de atendimento e os horários bloqueados.
        </p>

      </div>

      <WorkingDaysCard
        workingHours={workingHours}
        onSave={save}
      />

      <BlockedDatesCard
        blockedDates={blockedDates}
        onCreate={createBlockedDate}
        onUpdate={updateBlockedDate}
        onDelete={deleteBlockedDate}
      />

    </main>
  );

}