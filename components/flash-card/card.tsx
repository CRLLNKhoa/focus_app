/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
"use client"
import { useFlashcardStore } from "@/stores/flashcard";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { IconHeart } from "@tabler/icons-react";
import React from "react";

function Card({data}:{data:any}) {
  const setFlashcard = useFlashcardStore((state) => state.setFlashcard);

  return (
    <div className="border p-2 rounded-lg flex flex-col gap-1">
      <h2 onClick={() => setFlashcard(data)}
        className="line-clamp-1 font-semibold cursor-pointer hover:underline"
      >
        {data?.name}
      </h2>
      <div className="flex items-center justify-between gap-2">
        <Chip color="primary" size="sm">
          {data?.content?.length} items
        </Chip>
        <Button isIconOnly variant="light">
          <IconHeart color="red" />
        </Button>
      </div>
    </div>
  );
}

export default Card;
