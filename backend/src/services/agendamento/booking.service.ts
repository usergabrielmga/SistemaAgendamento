import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getAvailableHoursService } from "./availability.service";
type Transaction = Prisma.TransactionClient;
interface CreateBookingInput {
  serviceId: number;
  date: string;
  hour: string;
  name: string;
  phone: string;
  email: string;
  observations?: string;
}

function validateBookingData(
  data: CreateBookingInput
) {
  const {
    serviceId,
    date,
    hour,
    name,
    phone,
    email,
  } = data;

  if (!serviceId) {
    throw new Error("Serviço é obrigatório.");
  }

  if (!date) {
    throw new Error("Data é obrigatória.");
  }

  if (!hour) {
    throw new Error("Horário é obrigatório.");
  }

  if (!name?.trim()) {
  throw new Error("Nome é obrigatório.");
}

if (!phone?.trim()) {
  throw new Error("Telefone é obrigatório.");
}

if (!email?.trim()) {
  throw new Error("E-mail é obrigatório.");
}
}

export async function getServicesService() {
  const services = await prisma.services.findMany({
    select: {
      id_service: true,
      name: true,
      description: true,
      duration: true,
      price: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return services.map((service) => ({
    ...service,
    price: Number(service.price),
  }));
}

export async function createBookingService(
  data: CreateBookingInput
) {
  validateBookingData(data);

  const {
    serviceId,
    date,
    hour,
    name,
    phone,
    observations,
  } = data;

  const email =
    data.email.trim().toLowerCase();

  console.log("====================================");
  console.log("CRIANDO AGENDAMENTO");
  console.log({
    serviceId,
    date,
    hour,
  });

  return prisma.$transaction(async (tx) => {

    const client =
      await findOrCreateClient(
        tx,
        name,
        phone,
        email
      );

    // Cria a data sem sofrer influência do fuso horário
    const [year, month, day] =
      date.split("-").map(Number);

    const appointmentDate =
      new Date(year, month - 1, day);

    console.log("====================================");
    console.log("DATA RECEBIDA DO FRONT");
    console.log(date);

    console.log("DATE GERADA");
    console.log(appointmentDate);

    console.log("ISO");
    console.log(appointmentDate.toISOString());

    console.log("LOCAL");
    console.log(appointmentDate.toString());
    console.log("====================================");

    await ensureSlotIsAvailable(
      tx,
      serviceId,
      appointmentDate,
      hour
    );

    const [hours, minutes] =
      hour.split(":").map(Number);

    // Campo TIME
    const appointmentHour =
      new Date(1970, 0, 1, hours, minutes, 0, 0);

    console.log("====================================");
    console.log("HORÁRIO GERADO");
    console.log({
      appointmentHour,
      iso: appointmentHour.toISOString(),
      local: appointmentHour.toString(),
    });
    console.log("====================================");

    console.log("====================================");
    console.log("DATA ENVIADA PARA O PRISMA");
    console.log({
      appointmentDate,
      iso: appointmentDate.toISOString(),
      local: appointmentDate.toString(),
    });
    console.log("====================================");

    const appointment =
      await tx.appointments.create({
        data: {
          id_client: client.id_client,
          id_service: serviceId,
          date: appointmentDate,
          hour: appointmentHour,
          status: "Agendado",
          observations:
            observations ?? null,
        },
        include: {
          clients: true,
          services: true,
        },
      });

    console.log("====================================");
    console.log("AGENDAMENTO SALVO");
    console.log({
      id: appointment.id_appointment,
      date: appointment.date,
      hour: appointment.hour,
    });
    console.log("====================================");

    return {
      id: appointment.id_appointment,

      client: appointment.clients.name,

      service: appointment.services.name,

      date: appointment.date,

      hour: appointment.hour,

      status: appointment.status,

      observations:
        appointment.observations,
    };
  });
}



async function findOrCreateClient(
  tx: Transaction,
  name: string,
  phone: string,
  email: string
) {

  console.log("BUSCANDO CLIENTE:");
  console.log({
    email,
    phone
  });


  const existingClient =
    await tx.clients.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            telephone: phone,
          },
        ],
      },
    });


  console.log("CLIENTE ENCONTRADO:");
  console.log(existingClient);


  if (existingClient) {

    return tx.clients.update({
      where: {
        id_client: existingClient.id_client,
      },
      data: {
        name,
        telephone: phone,
      },
    });

  }


  console.log("CRIANDO NOVO CLIENTE");


  return tx.clients.create({
    data: {
      name,
      telephone: phone,
      email,
    },
  });
  
}


async function ensureSlotIsAvailable(
  tx: Transaction,
  serviceId: number,
  date: Date,
  hour: string
) {
  console.log("====================================");
  console.log("VALIDANDO HORÁRIO");
  console.log({
    serviceId,
    date,
    hour,
  });

  const availableHours =
    await getAvailableHoursService(
      tx,
      serviceId,
      date
    );

  console.log("HORÁRIOS DISPONÍVEIS:");
  console.log(availableHours);

  const available =
    availableHours.includes(hour);

  console.log("HORÁRIO DISPONÍVEL?", available);

  if (!available) {
    throw new Error(
      "Este horário acabou de ser reservado. Escolha outro horário."
    );
  }
}


export async function getBookingService(
  id: number
) {
  const appointment =
    await prisma.appointments.findUnique({
      where: {
        id_appointment: id,
      },
      include: {
        clients: true,
        services: true,
      },
    });

  if (!appointment) {
    throw new Error(
      "Agendamento não encontrado."
    );
  }

  return {
  id_appointment: appointment.id_appointment,

  client: {
    id_client: appointment.clients.id_client,
    name: appointment.clients.name,
    phone: appointment.clients.telephone,
    email: appointment.clients.email,
  },

  service: {
    id_service: appointment.services.id_service,
    name: appointment.services.name,
    description: appointment.services.description,
    duration: appointment.services.duration,
    price: Number(appointment.services.price),
  },

  date: appointment.date.toISOString().split("T")[0],

  hour: appointment.hour,

  status: appointment.status,

  observations: appointment.observations,
};
}