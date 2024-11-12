import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

function CardAdmin({
  data,
  deleteFlashcard,
}: {
  data: any;
  deleteFlashcard: any;
}) {
  return (
    <div className="border p-2 rounded-lg flex flex-col gap-1">
      <h2 className="line-clamp-1 font-semibold cursor-pointer hover:underline">
        {data?.name}
      </h2>
      <div className="flex items-center justify-between gap-2">
        <Chip color="primary" size="sm">
          {data?.content?.length} items
        </Chip>
        <Button onPress={() => deleteFlashcard(data?.id)} isIconOnly variant="light">
          <IconTrash color="red" />
        </Button>
      </div>
    </div>
  );
}

export default CardAdmin;
