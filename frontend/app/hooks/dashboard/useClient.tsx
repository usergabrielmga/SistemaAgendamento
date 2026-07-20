"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchClients } from "./queries/client.query";


export default function useClients() {

  const [search, setSearch] = useState("");


  const {
    data: clients = [],
    isLoading,
    error,
    refetch,
  } = useQuery({

    queryKey: [
      "clients"
    ],

    queryFn:
      fetchClients,

  });



  const filteredClients = useMemo(() => {

    return clients.filter(
      (client) => {

        const name =
          client.name
            .toLowerCase();


        const telephone =
          client.telephone;


        const searchValue =
          search.toLowerCase();


        return (
          name.includes(searchValue) ||
          telephone.includes(search)
        );

      }
    );

  }, [
    clients,
    search
  ]);



  return {

    search,

    setSearch,

    filteredClients,

    clients,

    isLoading,

    error,

    refetch,

  };

}