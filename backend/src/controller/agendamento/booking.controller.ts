import { Request, Response } from "express";

import {
  getServicesService,
  createBookingService,
  getBookingService,
} from "../../services/agendamento/booking.service";

import {
  getAvailableDaysService,
  getAvailableHoursService,
} from "../../services/agendamento/availability.service";

import { prisma } from "../../lib/prisma";


export async function getServices(
  req: Request,
  res: Response
): Promise<void> {
  try {

    const services =
      await getServicesService();

    res.status(200).json(services);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erro ao buscar serviços.",
    });

  }
}


export async function getAvailableDays(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const serviceId = Number(req.query.serviceId);
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    console.log({
      serviceId,
      month,
      year,
    });

    if (!serviceId || !month || !year) {
      res.status(400).json({
        message: "Parâmetros inválidos.",
      });

      return;
    }

    const availableDays =
      await prisma.$transaction((tx) =>
        getAvailableDaysService(
          tx,
          serviceId,
          month,
          year
        )
      );

    res.status(200).json(availableDays);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Erro ao buscar dias disponíveis.",
    });
  }
}


export async function getAvailableHours(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const serviceId =
      Number(req.params.serviceId);

    const { date } =
      req.query;


    if (!serviceId) {
      res.status(400).json({
        message: "Serviço é obrigatório.",
      });

      return;
    }


    if (!date) {
      res.status(400).json({
        message: "Data é obrigatória.",
      });

      return;
    }


    const appointmentDate =
      new Date(String(date));


    const hours =
      await prisma.$transaction(
        async (tx) => {

          return getAvailableHoursService(
            tx,
            serviceId,
            appointmentDate
          );

        }
      );


    res.status(200).json(hours);


  } catch (error) {

    console.error(error);

    if (error instanceof Error) {

      res.status(400).json({
        message: error.message,
      });

      return;
    }


    res.status(500).json({
      message: "Erro ao buscar horários disponíveis.",
    });

  }

}



export async function createBooking(
  req: Request,
  res: Response
): Promise<void> {

  try {

    const booking =
      await createBookingService(
        req.body
      );


    res.status(201).json(booking);


  } catch (error) {

    console.error(error);


    if (error instanceof Error) {

      res.status(400).json({
        message: error.message,
      });

      return;
    }


    res.status(500).json({
      message: "Erro ao criar agendamento.",
    });

  }

}

export async function getBooking(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    const booking =
      await getBookingService(id);

    res.status(200).json(booking);

  } catch (error) {

    if (error instanceof Error) {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: "Erro ao buscar agendamento.",
    });
  }
}