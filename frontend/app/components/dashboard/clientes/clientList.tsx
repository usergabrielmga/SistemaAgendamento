import ClientCard from "./clientCard";
import { Client } from "@/app/types/dashboard/client.type";

interface Props {
  clients: Client[];
  onSelect: (client: Client) => void;
}

export default function ClientList({
  clients,
  onSelect,
}: Props) {
  return (
    <div className="  client-scroll
          max-h-[500px]
          overflow-y-auto
          rounded-3xl
          border
          bg-white
          divide-y">
      {clients.map((client) => (
        <ClientCard
          key={client.id_client}
          client={client}
          onClick={() => onSelect(client)}
        />
      ))}
    </div>
  );
}