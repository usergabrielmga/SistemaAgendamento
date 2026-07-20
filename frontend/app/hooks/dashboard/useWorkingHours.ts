"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  updateWorkingHours,
} from "@/app/services/dashboard/workingHours.service";


import {
  WorkingHour,
  UpdateWorkingHours,
} from "@/app/types/dashboard/workingHours.type";


import {
  fetchWorkingHours,
} from "./queries/workingHours.query";



export default function useWorkingHours() {


  const queryClient = useQueryClient();



  const {
    data: workingHours = [],
    isLoading: loading,
    error,

  } = useQuery({

    queryKey:[
      "working-hours",
    ],

    queryFn:
      fetchWorkingHours,

  });






  const saveMutation = useMutation({

    mutationFn:
      async (
        data: WorkingHour[]
      ) => {


        const payload: UpdateWorkingHours =
          data.map((day)=>({

            day_of_week:
              day.day_of_week,

            is_active:
              day.is_active,

            start_time:
              day.start_time,

            end_time:
              day.end_time,

          }));


        return updateWorkingHours(
          payload
        );

      },


    onSuccess:()=>{

      queryClient.invalidateQueries({

        queryKey:[
          "working-hours",
        ],

      });

    },

  });







  async function save(
    data: WorkingHour[]
  ){

    await saveMutation.mutateAsync(
      data
    );

  }






  return {

    workingHours,

    loading,

    error,

    save,

  };

}