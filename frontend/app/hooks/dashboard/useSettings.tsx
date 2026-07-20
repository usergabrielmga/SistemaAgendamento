"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  createBlockedDate,
  updateBlockedDate,
  deleteBlockedDate,
} from "@/app/services/dashboard/settings.service";


import {
  CreateBlockedDate,
} from "@/app/types/dashboard/settings.type";


import {
  fetchBlockedDates,
} from "./queries/blockedDates.query";



export default function useSettings() {


  const queryClient = useQueryClient();



  const {
    data: blockedDates = [],
    isLoading: loading,
    error,

  } = useQuery({

    queryKey:[
      "blocked-dates",
    ],

    queryFn:
      fetchBlockedDates,

  });






  const createMutation = useMutation({

    mutationFn:
      createBlockedDate,


    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:[
          "blocked-dates",
        ],
      });

    },

  });







  const updateMutation = useMutation({

    mutationFn:
      ({
        id,
        data,
      }: {
        id:number;
        data:CreateBlockedDate;
      }) =>
        updateBlockedDate(
          id,
          data
        ),



    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:[
          "blocked-dates",
        ],
      });

    },

  });







  const deleteMutation = useMutation({

    mutationFn:
      deleteBlockedDate,


    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:[
          "blocked-dates",
        ],
      });

    },

  });








  async function create(
    data:CreateBlockedDate
  ){

    await createMutation.mutateAsync(
      data
    );

  }






  async function update(
    id:number,
    data:CreateBlockedDate
  ){

    await updateMutation.mutateAsync({
      id,
      data,
    });

  }






  async function remove(
    id:number
  ){

    await deleteMutation.mutateAsync(
      id
    );

  }






  return {

    blockedDates,

    loading,

    error,

    createBlockedDate:create,

    updateBlockedDate:update,

    deleteBlockedDate:remove,

  };

}