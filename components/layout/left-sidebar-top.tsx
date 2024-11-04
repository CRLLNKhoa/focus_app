"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import { IconHeadphones } from "@tabler/icons-react";
import { IconDownload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { upgradeAccount } from "@/actions/user";
import { useAccountStore } from "@/stores/user";
import ModalSteak from "../modalSteak";

const LeftSidebarTop = () => {
  const setAccount = useAccountStore((state) => state.setAccount);
  const account = useAccountStore((state) => state.user);
  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: () => upgradeAccount(),
    onSuccess: () => {
      setAccount(data?.data);
      document.location.reload();
    },
  });


  return (
    <div className={" absolute top-2 left-2 flex items-center gap-2"}>
      <div
        className={
          "bg-white shadow-lg dark:bg-[#232931] p-[6px] px-2 flex items-center gap-1 rounded-md"
        }
      >
        <Button
          variant={"light"}
          size={"sm"}
          radius={"sm"}
          className={"flex items-center"}
        >
          <IconHeadphones stroke={1.2} />
          <p className={"text-small"}>Focus</p>
        </Button>
        <div
          className={"border-x-[1px] border-border dark:border-slate-600 px-2"}
        >
          <ModalSteak />
        </div>
        {account?.id ? (
          <Button
            isLoading={isPending}
            variant={"light"}
            size={"sm"}
            radius={"sm"}
            className={"flex items-center text-md"}
          >
            Hello! {account?.name}
          </Button>
        ) : (
          account === null && (
            <Button
              onPress={() => mutateAsync()}
              isLoading={isPending}
              color={"primary"}
              variant={"solid"}
              size={"sm"}
              radius={"sm"}
              className={"flex items-center text-md"}
            >
              🚀 Upgrade
            </Button>
          )
        )}
      </div>

      <div
        className={
          "bg-white shadow-lg dark:bg-[#232931] p-[6px] flex items-center gap-1 rounded-md"
        }
      >
        <Button
          variant={"light"}
          size={"sm"}
          radius={"sm"}
          className={"flex items-center text-md"}
        >
          <IconDownload stroke={1.25} />
          <p className={"text-small"}>Desktop App</p>
        </Button>
      </div>
    </div>
  );
};

export default LeftSidebarTop;
