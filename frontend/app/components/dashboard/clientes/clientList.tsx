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
    <div className="bg-white rounded-3xl border divide-y">
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