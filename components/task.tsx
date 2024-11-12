"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@nextui-org/checkbox";
import { IconGripVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import React from "react";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { TTask } from "@/types";
import { cn } from "@/libs/utils";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { tags } from "@/data/tags";

function Task({
  task,
  active,
  tagChange,
  deleteFn,
}: {
  task: TTask;
  active: (id: number) => void;
  tagChange: (id: number, tag: string) => void;
  deleteFn: (id: number) => void;
}) {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({
      id: task.id,
    });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="group flex flex-col border p-2 pl-2 rounded-lg bg-white shadow-sm"
      >
        <div className="flex items-center">
          <div className="group-hover:opacity-100 opacity-0 duration-300">
            <IconGripVertical
              color="gray"
              className="size-0 group-hover:size-4 duration-300"
            />
          </div>
          <Checkbox
            onChange={() => active(task.id)}
            size="md"
            isSelected={task.isCompeleted}
          />
          <p
            className={cn(
              "line-clamp-1 mr-4",
              task.isCompeleted && "line-through text-gray-400"
            )}
          >
            {task.title}
          </p>
          <Button
            onPress={onOpen}
            variant="light"
            isIconOnly
            className="opacity-0 group-hover:opacity-100 ml-auto"
          >
            <IconPencil stroke={1.5} size={20} />
          </Button>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <Chip size="sm" variant="bordered" className={"bg-transparent"}>
            {task.tags.label}
          </Chip>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className="flex flex-col gap-4 py-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onChange={() => active(task.id)}
                      size="md"
                      isSelected={task.isCompeleted}
                    />
                    <p
                      className={cn(
                        "mr-4",
                        task.isCompeleted && "line-through text-gray-400"
                      )}
                    >
                      {task.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      label="Tags"
                      className="max-w-xs"
                      variant="bordered"
                      defaultSelectedKeys={[task.tags.key]}
                      onChange={(e) => tagChange(task.id, e.target.value)}
                    >
                      {tags.map((tag) => (
                        <SelectItem key={tag.key}>{tag.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Textarea
                      label="Task description"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                      className="max-full"
                    />
                  </div>
                  <Button
                    radius="sm"
                    variant="light"
                    color="danger"
                    className="mr-auto"
                    startContent={<IconTrash stroke={1.5} size={20} />}
                    onPress={() => deleteFn(task.id)}
                  >
                    Delete task
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Task;
