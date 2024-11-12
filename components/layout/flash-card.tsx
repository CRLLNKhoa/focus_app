"use client";
import { cn } from "@/libs/utils";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  IconHeartSpark,
  IconMinus,
  IconWorldUpload,
} from "@tabler/icons-react";
import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import MyList from "../flash-card/my-list";
import { useToggleStore } from "@/stores/toggle";

function FlashCard() {
  const isShow = useToggleStore((state) => state.flashcard);
  const toggle = useToggleStore((state) => state.toggleFlashcard);

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
        maxConstraints={[460, 560]}
        resizeHandles={["se"]}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col relative"
        >
          <strong className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-between border-b">
            <h1>Flash Card</h1>
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

          <div className="flex flex-1">
            <div className="h-full flex flex-col gap-4 p-2 border-r">
              <Tooltip placement="right" showArrow={true} content="Khám phá">
              <Button radius="sm" variant="light" isIconOnly>
                <IconWorldUpload strokeWidth={1.5} size={24} />
              </Button>
              </Tooltip>
              <Tooltip placement="right" showArrow={true} content="Yêu thích">
              <Button radius="sm" variant="light" isIconOnly>
                <IconHeartSpark strokeWidth={1.5} size={24} />
              </Button>
              </Tooltip>
            </div>

            <div className="flex-1">
                <MyList />
            </div>
          </div>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default FlashCard;
