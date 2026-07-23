import { Request, Response } from "express";

import {
  getServicesService,
  createBookingService,
} from "../../services/agendamento/booking.service";

import {
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