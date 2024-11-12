"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { IconStar, IconVolume } from "@tabler/icons-react";

function ItemCard({ data }: any) {
  const [isShow, setIsShow] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(data?.word);

      utterance.lang = 'en-UK'; // Thay đổi ngôn ngữ ở đây
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Trình duyệt không hỗ trợ Text-to-Speech');
    }
  };

  return (
    <motion.div
      onClick={() => setIsShow(!isShow)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#2E3856] cursor-pointer h-full rounded-lg shadow-lg flex items-center justify-center text-white"
    >
      {isShow ? data?.meaning : data?.word}

      <div className="absolute top-2 right-2">
        {!isShow && (
          <Button onPress={handleSpeak} size="sm" isIconOnly variant="light">
            <IconVolume color="white" size={16} />
          </Button>
        )}

        <Button size="sm" isIconOnly variant="light">
          <IconStar color="white" size={16} />
        </Button>
      </div>
    </motion.div>
  );
}

export default ItemCard;
