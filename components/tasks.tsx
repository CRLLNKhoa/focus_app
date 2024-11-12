"use client";
import { Button } from "@nextui-org/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useToggleStore } from "@/stores/toggle";
import { cn } from "@/libs/utils";
import { Progress } from "@nextui-org/progress";
import ListTask from "./list-task";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { tags } from "@/data/tags";
import { TTask } from "@/types";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

function Tasks() {
  const isShow = useToggleStore((state) => state.task);
  const toggle = useToggleStore((state) => state.toggleTask);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isReadyConfetti, setIsReadyConfetti] = useState(true);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    tags: {
      label: "",
      key: "",
    },
  });

  const [task, setTask] = useState<TTask[]>([
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      isCompeleted: false,
      tags: {
        label: "🌎 Work",
        key: "work",
      },
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 1",
      isCompeleted: true,
      tags: {
        label: "📂 Unasssigned",
        key: "unasssigned",
      },
    },
  ]);

  const handleChangeIsComplete = (id: number) => {
    const newTask = task.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompeleted: !item.isCompeleted,
        };
      }

      return item;
    });

    setTask(newTask);
  };

  const handleChangeTag = (id: number | null, key: string) => {
    if (id !== null) {
      const newTask = task.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            tags: {
              label: tags.find((tag) => tag.key === key)?.label || "",
              key: tags.find((tag) => tag.key === key)?.key || "",
            },
          };
        }

        return item;
      });

      setTask(newTask);
    } else {
      setInputValue({
        ...inputValue,
        tags: {
          label: tags.find((tag) => tag.key === key)?.label || "",
          key: tags.find((tag) => tag.key === key)?.key || "",
        },
      });
    }
  };

  const handleAddTask = () => {
    if (inputValue.title === "" || inputValue.tags.key === "") {
      toast.error("Vui lòng nhập đầy đủ các trường !");

      return;
    } else {
      const newTask = {
        id: task.length + 1,
        title: inputValue.title,
        description: "",
        isCompeleted: false,
        tags: inputValue.tags,
      };

      setTask([...task, newTask]);
    }
  };

  const handleDeleteTask = (id: number) => {
    const newTask = task.filter((item) => item.id !== id);

    setTask(newTask);
  };

  // const handleEditTask = (
  //   id: number,
  //   newData: {
  //     title: string;
  //     description: string;
  //     tags: { label: string; key: string };
  //   }
  // ) => {
  //   const newTask = task.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         ...newData,
  //       };
  //     }

  //     return item;
  //   });

  //   setTask(newTask);
  // };

  const handleDragEnd = (e: any) => {
    const { active, over } = e;

    if (active.id === over?.id) {
      return;
    }

    if (active.id !== over?.id) {
      const oldIndex = task.findIndex((item: any) => item.id === active.id);
      const newIndex = task.findIndex((item: any) => item.id === over?.id);
      const newTask = [...task];

      newTask.splice(oldIndex, 1);
      newTask.splice(newIndex, 0, { ...task[oldIndex] });
      setTask(newTask);
    }
  };

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  useEffect(() => {
    if (
      task.filter((item) => item.isCompeleted).length === task.length &&
      isReadyConfetti
    ) {
      fireConfetti();
      setIsReadyConfetti(false);
    }

    if (task.filter((item) => item.isCompeleted).length !== task.length) {
      setIsReadyConfetti(true);
    }
  }, [task, isReadyConfetti]);

  return (
    <Draggable bounds="parent" handle="strong">
      <ResizableBox
        className={cn(
          "!absolute -left-[1000px] !top-1/2 bg-white z-50 rounded-lg shadow-lg overflow-hidden group",
          isShow ? "left-0 opacity-100 z-0" : "-left-[10000px] opacity-0 z-0"
        )}
        width={460}
        height={360}
        minConstraints={[460, 360]}
        maxConstraints={[960, 560]}
        resizeHandles={["se"]}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col relative"
        >
          <strong className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-between border-b">
            <h1>Task</h1>
            <div className="flex items-center">
              <Button
                onPress={() => toggle(false)}
                size="sm"
                isIconOnly
                variant="light"
              >
                <IconMinus />
              </Button>
            </div>
          </strong>
          <div className="p-1 sticky top-0 rounded-lg select-none bg-white z-20">
            <Button
              variant="light"
              className="w-full items-center justify-start"
              radius="sm"
              startContent={<IconPlus stroke={1.2} size={20} />}
              onPress={() => setIsShowAdd(!isShowAdd)}
            >
              Add task
            </Button>
          </div>

          <div className="flex flex-col flex-1 p-2 overflow-y-auto noscroll-bar">
            {isShowAdd && (
              <div className="flex flex-col mb-4 border p-2 rounded-lg gap-2">
                <Input
                  type="text"
                  placeholder="Enter task name"
                  label="Task name"
                  variant="bordered"
                  value={inputValue.title}
                  onChange={(e) =>
                    setInputValue({ ...inputValue, title: e.target.value })
                  }
                />
                <Select
                  label="Tags"
                  className="max-w-xs"
                  variant="bordered"
                  onChange={(e) => handleChangeTag(null, e.target.value)}
                >
                  {tags.map((tag) => (
                    <SelectItem key={tag.key}>{tag.label}</SelectItem>
                  ))}
                </Select>
                <Button
                  className="ml-auto"
                  color="primary"
                  startContent={<IconPlus />}
                  onPress={handleAddTask}
                >
                  Lưu lại
                </Button>
              </div>
            )}
            <DndContext
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
            >
              <ListTask
                data={task}
                active={handleChangeIsComplete}
                tagChange={handleChangeTag}
                deleteFn={handleDeleteTask}
              />
            </DndContext>
          </div>

          <div className="p-1 mt-auto flex items-center gap-4 px-4 border-t">
            <Progress
              color="default"
              aria-label="Loading..."
              value={Math.floor(
                (task.filter((item) => item.isCompeleted).length /
                  task.length) *
                  100
              )}
            />
            <div className="flex items-center gap-1 text-sm">
              <p>{task.filter((item) => item.isCompeleted).length}</p>
              <p>/</p>
              <p>{task.length}</p>
            </div>
          </div>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default Tasks;
