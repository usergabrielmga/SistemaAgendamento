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
} = data;

const email =
  data.email.trim().toLowerCase();

  return prisma.$transaction(async (tx) => {

  const client =
    await findOrCreateClient(
      tx,
      name,
      phone,
      email
    );

  const appointmentDate = new Date(date);

 await ensureSlotIsAvailable(
  tx,
  serviceId,
  appointmentDate,
  hour
);

  const [hours, minutes] =
  hour.split(":").map(Number);

const appointmentHour =
  new Date(appointmentDate);

appointmentHour.setHours(
  hours,
  minutes,
  0,
  0
);

  const appointment =
  await tx.appointments.create({
    data: {
      id_client: client.id_client,
      id_service: serviceId,

      date: appointmentDate,

      hour: appointmentHour,

      status: "Agendado",
    },

    include: {
      clients: true,
      services: true,
    },
  });

  return {
  id: appointment.id_appointment,

  client: appointment.clients.name,

  service: appointment.services.name,

  date: appointment.date,

  hour: appointment.hour,

  status: appointment.status,
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
  const availableHours =
    await getAvailableHoursService(
      tx,
      serviceId,
      date
    );

  const available =
    availableHours.includes(hour);

  if (!available) {
    throw new Error(
      "Este horário acabou de ser reservado. Escolha outro horário."
    );
  }
}
