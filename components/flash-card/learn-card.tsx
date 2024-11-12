"use client";
import { cn } from "@/libs/utils";
import { useFlashcardStore } from "@/stores/flashcard";
import { Button } from "@nextui-org/button";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ItemCard from "./item-card";
import { motion } from "framer-motion";

function LearnCard() {
  const data = useFlashcardStore((state) => state.flashcard);
  const set = useFlashcardStore((state) => state.setFlashcard);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (data) {
      if (currentIndex < data.content.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const prevCard = () => {
    if (data) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
      setCurrentIndex(0);
  }, [data]);

  return (
    <Draggable bounds="parent" handle="strong">
      <ResizableBox
        className={cn(
          "!absolute -left-[1000px] !top-1/2 bg-white z-50 rounded-lg shadow-lg overflow-hidden group",
          data !== null
            ? "left-0 opacity-100 z-0"
            : "-left-[10000px] opacity-0 z-0"
        )}
        width={460}
        height={260}
        minConstraints={[460, 260]}
        maxConstraints={[960, 260]}
        resizeHandles={["se"]}
      >
        <div
          style={{ width: "100%", height: "100%" }}
          className="flex flex-col relative justify-between"
        >
          <strong className="cursor-grab active:cursor-grabbing p-2 flex items-center justify-between border-b">
            <h1>{data?.name || "Flash Card"}</h1>
            <div className="flex items-center">
              <Button
                onPress={() => set(null)}
                size="sm"
                isIconOnly
                variant="light"
              >
                <IconX />
              </Button>
            </div>
          </strong>

          <div className="flex-1 p-2">
            <motion.div
              key={currentIndex} // Mỗi thẻ sẽ có key khác nhau để tạo hiệu ứng động khi thay đổi
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 h-full"
            >
              <ItemCard data={data?.content[currentIndex]} />
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-2 border-t p-2">
            <Button disabled={currentIndex === 0} onPress={prevCard} isIconOnly variant="bordered">
              <IconArrowLeft />
            </Button>
            <div className="flex items-center gap-1">
              <p>{currentIndex + 1}</p>
              <p>/</p>
              <p>{data?.content.length}</p>
            </div>
            <Button disabled={data !== null && currentIndex === data?.content.length - 1} onPress={nextCard} isIconOnly variant="bordered">
              <IconArrowRight />
            </Button>
          </div>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default LearnCard;
