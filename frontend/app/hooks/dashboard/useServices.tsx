"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createService,
  updateService,
  deleteService,
} from "@/app/services/dashboard/services.service";

import { Services } from "@/app/types/dashboard/services.type";

import { fetchServices } from "./queries/services.query";


export default function useServices() {


  const queryClient = useQueryClient();



  const {
    data: services = [],
    isLoading: loading,
    error,
  } = useQuery({

    queryKey: [
      "services",
    ],

    queryFn:
      fetchServices,

  });





  const createMutation = useMutation({

    mutationFn:
      createService,


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:[
          "services",
        ],
      });

    },

  });






  const updateMutation = useMutation({

    mutationFn:
      ({
        id_service,
        service,
      }: {
        id_service:number;
        service:Omit<Services,"id_service">
      }) =>
        updateService(
          id_service,
          service
        ),


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:[
          "services",
        ],
      });

    },

  });







  const deleteMutation = useMutation({

    mutationFn:
      deleteService,


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey:[
          "services",
        ],
      });

    },

  });







  async function create(
    service: Omit<Services,"id_service">
  ){

    await createMutation.mutateAsync(
      service
    );

  }







  async function update(
    id_service:number,
    service:Omit<Services,"id_service">
  ){

    await updateMutation.mutateAsync({
      id_service,
      service,
    });

  }







  async function remove(
    id_service:number
  ){

    await deleteMutation.mutateAsync(
      id_service
    );

  }






  return {

    services,

    loading,

    error,

    create,

    update,

    remove,

  };

}