import { Prisma } from "@prisma/client";

type Transaction = Prisma.TransactionClient;

import {
  addMinutes,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";

interface ServiceData {
  id_service: number;
  duration: number;
}

interface WorkingHourData {
  day_of_week: number;
  is_active: boolean;
  start_time: Date | null;
  end_time: Date | null;
}

interface AppointmentData {
  date: Date;
  hour: Date;
  services: {
    duration: number;
  };
}

interface BlockedDateData {
  block_date: Date;
  start_time: Date | null;
  end_time: Date | null;
}

interface AvailabilityContext {
  service: ServiceData;
  workingHours: WorkingHourData[];
  appointments: AppointmentData[];
  blockedDates: BlockedDateData[];
}

async function loadAvailabilityContext(
  tx: Transaction,
  serviceId: number,
  month: number,
  year: number
): Promise<AvailabilityContext> {

  const firstDay = startOfMonth(
    new Date(year, month - 1)
  );

  const lastDay = endOfMonth(firstDay);

  console.log("================================");
  console.log("PERÍODO DA CONSULTA");
  console.log({
    firstDay,
    lastDay,
  });
  console.log("================================");

  const [
    service,
    workingHours,
    appointments,
    blockedDates,
  ] = await Promise.all([

    tx.services.findUnique({
      where: {
        id_service: serviceId,
      },
      select: {
        id_service: true,
        duration: true,
      },
    }),

    tx.working_hours.findMany(),

    tx.appointments.findMany({
      where: {
        status: "Agendado",
        date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      include: {
        services: {
          select: {
            duration: true,
          },
        },
      },
    }),

    tx.blocked_dates.findMany({
      where: {
        block_date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    }),

  ]);

  console.log("================================");
  console.log("AGENDAMENTOS ENCONTRADOS");
  console.log("TOTAL:", appointments.length);

  appointments.forEach((appointment) => {
    console.log({
      id: appointment.id_appointment,
      date: appointment.date,
      hour: appointment.hour,
      status: appointment.status,
      duration: appointment.services.duration,
    });
  });

  console.log("================================");

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  return {
    service,
    workingHours,
    appointments,
    blockedDates,
  };
}


export async function getAvailableDaysService(
  tx: Transaction,
  serviceId: number,
  month: number,
  year: number
) {
 const context =
  await loadAvailabilityContext(
    tx,
    serviceId,
    month,
    year
  );

  const firstDay = startOfMonth(
    new Date(year, month - 1)
  );

  const lastDay = endOfMonth(firstDay);

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const availableDays: string[] = [];

  for (const day of days) {
  if (getAvailableHours(day, context).length) {
    availableDays.push(
      format(day, "yyyy-MM-dd")
    );
  }
}

  return availableDays;
}


export async function getAvailableHoursService(
  tx: Transaction,
  serviceId: number,
  date: Date
) {
  const context =
    await loadAvailabilityContext(
      tx,
      serviceId,
      date.getMonth() + 1,
      date.getFullYear()
    );

  return getAvailableHours(
    date,
    context
  );
}

function getAvailableHours(
  date: Date,
  context: AvailabilityContext
) {

  const currentDate = format(
    date,
    "yyyy-MM-dd"
  );


  const workingHours =
    context.workingHours.find(
      (workingHour) =>
        workingHour.day_of_week === date.getDay()
    );


  if (
    !workingHours ||
    !workingHours.is_active ||
    !workingHours.start_time ||
    !workingHours.end_time
  ) {
    return [];
  }


  const appointments =
    context.appointments.filter(
      (appointment) =>
        format(
          appointment.date,
          "yyyy-MM-dd"
        ) === currentDate
    );


  const blockedDates =
    context.blockedDates.filter(
      (blocked) =>
        format(
          blocked.block_date,
          "yyyy-MM-dd"
        ) === currentDate
    );


  console.log("================================");
  console.log("DATA CONSULTADA:", currentDate);
  console.log("AGENDAMENTOS DO DIA:");
  console.log(
    appointments.map((appointment)=>({
      date: format(
        appointment.date,
        "yyyy-MM-dd"
      ),
      hour: format(
        appointment.hour,
        "HH:mm"
      )
    }))
  );
  console.log("================================");


  const slots =
    generateTimeSlots(
      workingHours.start_time,
      workingHours.end_time
    );


  return slots.filter((slot)=>{


    const appointmentConflict =
      hasAppointmentConflict(
        slot,
        context.service.duration,
        appointments
      );


    const blockedConflict =
      hasBlockedConflict(
        slot,
        context.service.duration,
        blockedDates
      );


    const fitsWorkingHours =
      finishesWithinWorkingHours(
        slot,
        context.service.duration,
        workingHours.end_time!
      );


    return (
      !appointmentConflict &&
      !blockedConflict &&
      fitsWorkingHours
    );

  });

}


function hasAppointmentConflict(
  slot: string,
  serviceDuration: number,
  appointments: AppointmentData[]
): boolean {


  const [hours, minutes] =
    slot.split(":").map(Number);


  const slotStartMinutes =
    hours * 60 + minutes;


  const slotEndMinutes =
    slotStartMinutes + serviceDuration;



  for (const appointment of appointments) {


    const appointmentStart =
      Number(
        format(
          appointment.hour,
          "HH"
        )
      ) * 60
      +
      Number(
        format(
          appointment.hour,
          "mm"
        )
      );


    const appointmentEnd =
      appointmentStart +
      appointment.services.duration;



    console.log({
      slot,
      appointmentHour:
        format(
          appointment.hour,
          "HH:mm"
        ),
      slotStartMinutes,
      slotEndMinutes,
      appointmentStart,
      appointmentEnd,
    });



    const conflict =
      slotStartMinutes < appointmentEnd &&
      slotEndMinutes > appointmentStart;



    if(conflict){
      console.log(
        "HORÁRIO BLOQUEADO:",
        slot
      );

      return true;
    }

  }


  return false;

}

function hasBlockedConflict(
  slot: string,
  serviceDuration: number,
  blockedDates: BlockedDateData[]
): boolean {

  const [hours, minutes] = slot
    .split(":")
    .map(Number);

  const slotStartMinutes =
    hours * 60 + minutes;

  const slotEndMinutes =
    slotStartMinutes + serviceDuration;

  for (const blocked of blockedDates) {

    // dia inteiro bloqueado
    if (
      !blocked.start_time ||
      !blocked.end_time
    ) {
      return true;
    }

    const blockedStart =
      blocked.start_time.getHours() * 60 +
      blocked.start_time.getMinutes();

    const blockedEnd =
      blocked.end_time.getHours() * 60 +
      blocked.end_time.getMinutes();

    if (
      slotStartMinutes < blockedEnd &&
      slotEndMinutes > blockedStart
    ) {
      return true;
    }
  }

  return false;
}


function finishesWithinWorkingHours(
  slot: string,
  serviceDuration: number,
  endTime: Date
) {

  const [hours, minutes] = slot
    .split(":")
    .map(Number);

  const slotEnd =
    hours * 60 +
    minutes +
    serviceDuration;

  const workingEnd =
    endTime.getHours() * 60 +
    endTime.getMinutes();

  return slotEnd <= workingEnd;
}

function generateTimeSlots(
  startTime: Date,
  endTime: Date,
  interval: number = 30
): string[] {
  const slots: string[] = [];

  let current = new Date(startTime);

  while (current < endTime) {
    slots.push(format(current, "HH:mm"));

    current = addMinutes(current, interval);
  }

  return slots;
}