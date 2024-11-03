"use client";
import { favoriteSpace } from "@/actions/user";
import { useAccountStore } from "@/stores/user";
import { useVideoStore } from "@/stores/video";
import { TSpace } from "@/types";
import { Button } from "@nextui-org/button";
import { IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

function Favorites() {
  const account = useAccountStore((state) => state.user);
  const favoiriteSpaceStore = useAccountStore((state) => state.favoiriteSpace);
  const setVideo = useVideoStore((state) => state.setVideo);

  const mutation = useMutation({
    mutationFn: () => favoriteSpace(account?.spacesFavorite || []),
  });

  const handleFavorite = async (space: TSpace) => {
    favoiriteSpaceStore(space);
    mutation.mutate();
  };

  return (
    <div className="flex flex-col p-4 gap-2">
      {account?.spacesFavorite?.length! > 0 && (
          account?.spacesFavorite?.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div onClick={() => setVideo(item)} key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-primary select-none">
            <div className="border p-2 rounded-lg flex-1">
              <p className="text-xs">{item.title}</p>
            </div>
            <Button isLoading={mutation.isPending} onPress={() => handleFavorite(item)} radius="sm" size="sm" isIconOnly variant="light" color="danger">
              <IconX />
            </Button>
          </div>
          ))
      )}
    </div>
  );
}

export default Favorites;
