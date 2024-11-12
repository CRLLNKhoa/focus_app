"use client";
import React from "react";
import Card from "./card";
import { getFlashcards } from "@/actions/flashcard";
import { useQuery } from "@tanstack/react-query";

function MyList() {
  const { data, error, refetch, isFetched } = useQuery({
    queryKey: ["flashcard-admin"],
    queryFn: () => getFlashcards(),
  });

  return (
    <div className="h-[360px] pb-12 flex flex-col gap-2 p-2 overflow-y-auto">
      {
        data?.data?.map((item: any) => (
          <Card key={item.id} data={item} />
        ))
      }
    </div>
  );
}

export default MyList;
