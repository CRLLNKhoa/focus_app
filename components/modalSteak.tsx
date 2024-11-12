import { setSteakCount } from "@/actions/user";
import { isYesterday } from "@/libs/utils";
import { useLangStore } from "@/stores/lang";
import { useAccountStore } from "@/stores/user";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import React, { useEffect } from "react";

function ModalSteak() {
  const t = useLangStore((state) => state.lang);
  const { user: account, setAccount } = useAccountStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const handle = async () => {
      await setSteakCount(
        String(account?.lastActiveDate),
        Number(account?.streakCount)
      );

      if (account) {
        if (isYesterday(account?.lastActiveDate || "")) {
          setAccount({
            ...account,
            streakCount: Number(account?.streakCount) + 1,
          });
        }
      }
    };

    if (account) {
      handle();
    }
  }, [account?.id]);

  return (
    <>
      <Tooltip content={t.tooltipBtnSteak}>
        <Button
          onPress={onOpen}
          variant={"light"}
          size={"sm"}
          radius={"sm"}
          className={"flex items-center text-md"}
        >
          {account?.streakCount} 🔥
        </Button>
      </Tooltip>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t.modalSteak.title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1/2 flex flex-col items-center justify-center">
                      <h2>{t.modalSteak.item1}</h2>
                      <p>🔥 {account?.longestStreak}</p>
                    </div>
                    <div className="w-1/2 border-l flex flex-col items-center justify-center">
                      <h2>{t.modalSteak.item2}</h2>
                      <p>⏳ {account?.hoursOnApp}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalSteak;
