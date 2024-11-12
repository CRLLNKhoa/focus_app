"use client";
import React from "react";
import Task from "./task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TTask } from "@/types";

function ListTask({
  data,
  active,
  tagChange,
  deleteFn }: {
  data: TTask[];
  active: (id: number) => void;
  tagChange: (id: number | null, key: string) => void;
  deleteFn: (id: number) => void;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        {data?.map((item: any) => (
          <Task
            key={item.id}
            task={item}
            active={active}
            tagChange={tagChange}
            deleteFn={deleteFn}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default ListTask;
