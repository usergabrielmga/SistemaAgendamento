"use client";

import { useServices } from "@/app/hooks/agendamento/queries/services.query";
import ServiceCard from "./ServiceCard";


export default function ServicesSection() {

   const {
    data: services = [],
    isLoading,
    error,
  } = useServices();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar os serviços.</p>;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
       

        {/* Grid de Serviços */}
        <div className="mt-0 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id_service}
              title={service.name}
              description={service.description}
              duration={service.duration}
              price={service.price}
              onBook={() => console.log(`Agendando: ${service.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}