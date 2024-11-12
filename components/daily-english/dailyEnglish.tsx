"use client";
import { cn } from "@/libs/utils";
import { Button } from "@nextui-org/button";
import {
  IconMinus,
} from "@tabler/icons-react";
import React from "react";
import Draggable from "react-draggable";
import { useToggleStore } from "@/stores/toggle";

function DailyEnglish() {
  const isShow = useToggleStore((state) => state.englishDaily);
  const toggle = useToggleStore((state) => state.toggleEnglishDaily);

  return (
    <Draggable bounds="parent" handle="strong">
      <div
        className={cn(
          "!absolute -left-[1000px] !top-1/2 w-[400px] bg-white z-50 rounded-lg shadow-lg overflow-hidden group",
          isShow ? "left-0 opacity-100 z-0" : "-left-[10000px] opacity-0 z-0"
        )}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col relative"
        >
          <strong className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-between border-b">
            <h1>English Daily</h1>
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

          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <p className="text-center font-semibold p-6 pb-2">
              &quot; Money is a tool. It will take you wherever you wish, but it
              will not replace you as the driver. &quot;
            </p>
            <div className="border-b w-1/4" />
            <p className="text-center p-6 pt-2">Tiền là một công cụ. Nó sẽ đưa bạn đến bất cứ nơi nào bạn muốn, nhưng nó sẽ không thay thế bạn làm tài xế.</p>
            <div className="flex flex-col items-center gap-1 w-full px-2 pb-2">
                <h2 className="font-semibold">Từ vựng</h2>
                <p>Decide (v) /dɪˈsaɪd/ : Đưa ra quyết định</p>
                <p>Habit (n) /hæbɪt/ : Thói quen</p>
                <p>Future (n) /&apos;fju:tər/ : Tương lai</p>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default DailyEnglish;
