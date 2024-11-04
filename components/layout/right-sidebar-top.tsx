"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconBell,
  IconBug,
  IconMail,
  IconSettings,
  IconUser,
  IconUserCircle,
  IconVolume,
  IconVolume3,
  IconPointFilled,
  IconChevronDown,
  IconDoor,
  IconLogout,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useLangStore } from "@/stores/lang";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ThemeSwitch } from "@/components/theme-switch";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUser } from "@clerk/clerk-react";
import { useVideoStore } from "@/stores/video";
import { Avatar } from "@nextui-org/avatar";
import { SignOutButton } from '@clerk/nextjs'
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/actions/user";
import { useAccountStore } from "@/stores/user";
import { TAccount } from "@/types";

const RightSidebarTop = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const t = useLangStore((state) => state.lang);
  const setLang = useLangStore((state) => state.setLang);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenAccount,
    onOpen: onOpenAccount,
    onOpenChange: onOpenChangeAccount,
  } = useDisclosure();
  const [hiddenUI, setHiddenUI] = useState(false);
  const search = useSearchParams();
  const host = search.get("host");
  const [storedValue, setValue] = useLocalStorage("lang-selected", "vi");
  const muted = useVideoStore((state) => state.muted);
  const toggleMuted = useVideoStore((state) => state.toggleMuted);
  const toggleFullscreen = useVideoStore((state) => state.toggleFullscreen);
  const playing = useVideoStore((state) => state.playing);
  const togglePlaying = useVideoStore((state) => state.togglePlaying);
  const { user } = useUser();
  const setAccount = useAccountStore((state) => state.setAccount);
  const {data, isFetched} = useQuery({
    queryKey: ["user"],
    queryFn: () => getAccount()
  });

  useEffect(() => {
    if(data?.data) {
      setAccount(data?.data[0] || null);
    }
  }, [isFetched]);

  useEffect(() => {
    setLang(storedValue);
  }, [storedValue]);

  return (
    <>
      <Suspense>
        <div className={"absolute right-2 top-2 flex items-center gap-2"}>
          <div
            className={
              "bg-white dark:bg-[#232931] p-[6px] px-2 rounded-md flex items-center gap-2"
            }
          >
            <Button size="sm" radius={"sm"} variant={"light"} className="text-sm">
              <IconPointFilled className={"text-green-500"} />
              {`${6} Online`}
            </Button>
            <div className={"border-x border-border dark:border-slate-600 px-2"}>
              <Dropdown offset={10}>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    radius={"sm"}
                    size="sm" className="text-sm"
                    startContent={<IconDoor stroke={1.25} />}
                    endContent={<IconChevronDown stroke={1.25} />}
                  >
                    {host ? host : "Phòng của tôi"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="account"
                    startContent={<IconUserCircle stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item1}
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => onOpen()}
                    key="account"
                    startContent={<IconSettings stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item2}
                  </DropdownItem>
                  <DropdownItem
                    key="account"
                    startContent={<IconMail stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item3}
                  </DropdownItem>
                  <DropdownItem
                    key="account"
                    startContent={<IconBug stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item4}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
  
            <Button className="text-sm" size="sm" radius={"sm"} variant={"light"}>
              Invite
            </Button>
          </div>
          <div
            className={
              "bg-white dark:bg-[#232931] p-[6px] px-2 rounded-md flex items-center gap-2"
            }
          >
             <Button size="sm"
              onPress={() => {
                togglePlaying();
              }}
              radius={"sm"}
              isIconOnly
              variant={"light"}
            >
              {playing ? <IconPlayerPause stroke={1.5} /> : <IconPlayerPlay stroke={1.5} />}
            </Button>
            <Button size="sm"
              onPress={() => {
                toggleMuted();
              }}
              radius={"sm"}
              isIconOnly
              variant={"light"}
            >
              {muted ? <IconVolume3 stroke={1.5} /> : <IconVolume stroke={1.5} />}
            </Button>
            <Button size="sm" radius={"sm"} isIconOnly variant={"light"}>
              <IconBell stroke={1.25} />
            </Button>
            <Button size="sm"
              onPress={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                  toggleFullscreen(true);
                  setFullScreen(true);
                } else if (document.exitFullscreen) {
                  document.exitFullscreen();
                  toggleFullscreen(false);
                  setFullScreen(false);
                }
              }}
              radius={"sm"}
              isIconOnly
              variant={"light"}
            >
              {!fullScreen ? (
                <IconArrowsMaximize stroke={1.5} />
              ) : (
                <IconArrowsMinimize stroke={1.5} />
              )}
            </Button>
            <div
              className={"border-l border-border dark:border-slate-600 pl-2 ml-2"}
            >
              <Dropdown offset={10}>
                <DropdownTrigger>
                  <Button size="sm" variant="light" radius={"sm"} isIconOnly>
                    <IconUser stroke={1.5} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    onPress={() => onOpenAccount()}
                    key="account"
                    startContent={<IconUserCircle stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item1}
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => onOpen()}
                    key="setting"
                    startContent={<IconSettings stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item2}
                  </DropdownItem>
                  <DropdownItem
                    key="feedback"
                    startContent={<IconMail stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item3}
                  </DropdownItem>
                  <DropdownItem
                    key="reportbug"
                    startContent={<IconBug stroke={1.25} />}
                  >
                    {t.menuAccountDropdown.item4}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Suspense>

      <Modal size={"xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t.menuAccountDropdown.item2}
              </ModalHeader>
              <ModalBody className={"pb-8 flex flex-col gap-8"}>
                <div className={"flex flex-col gap-2"}>
                  <h2 className={"text-sm text-muted-foreground font-semibold"}>
                    THEME
                  </h2>
                  <label
                    htmlFor={"toggle"}
                    className={"flex items-center justify-between"}
                  >
                    <p>{"Theme Mode"}</p>
                    <ThemeSwitch id={"toggle"} />
                  </label>
                </div>

                <div className={"flex flex-col gap-2"}>
                  <h2
                    className={
                      "text-sm text-muted-foreground font-semibold uppercase"
                    }
                  >
                    {t.lang}
                  </h2>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor={"toggle"}
                    className={"flex items-center justify-between"}
                  >
                    <Select
                      placeholder="Choose a language"
                      className="max-w-xs"
                      disabledKeys={[storedValue]}
                      onChange={(e) => {
                        setLang(e.target.value);
                        setValue(e.target.value);
                      }}
                    >
                      <SelectItem key={"vi"}>Việt Nam</SelectItem>
                      <SelectItem key={"en"}>English</SelectItem>
                    </Select>
                  </label>
                </div>

                <div className={"flex flex-col gap-2"}>
                  <h2
                    className={
                      "text-sm text-muted-foreground font-semibold mb-4"
                    }
                  >
                    FOCUS MODE
                  </h2>
                  <label className={"flex items-center justify-between"}>
                    <p>{t.focusMode.item1}</p>
                    <Checkbox
                      onChange={(e) => {
                        setHiddenUI(Boolean(e.target.value));
                      }}
                      defaultChecked={hiddenUI}
                    />
                  </label>
                  <label className={"flex items-center justify-between"}>
                    <p>{t.focusMode.item2}</p>
                    <Input
                      placeholder={"30"}
                      readOnly={true}
                      className={"w-[120px]"}
                      type="number"
                    />
                  </label>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        size={"xl"}
        isOpen={isOpenAccount}
        onOpenChange={onOpenChangeAccount}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t.account.title}
              </ModalHeader>
              <ModalBody className={"pb-8 flex flex-col gap-8"}>
                <div className={"flex flex-col gap-6"}>
                  <Avatar
                    src={user?.imageUrl ?? ""}
                    alt={user?.fullName ?? ""}
                    className="w-20 h-20 text-large"
                  />
                  <Input
                    type="email"
                    label="Email"
                    readOnly
                    placeholder={String(user?.primaryEmailAddress) || ""}
                    labelPlacement="outside"
                    startContent={
                      <IconMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <Input
                    type="email"
                    label="Name"
                    readOnly
                    placeholder={String(user?.fullName) || ""}
                    labelPlacement="outside"
                    startContent={
                      <IconUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />

                  <SignOutButton>
                    <Button color="danger" startContent={<IconLogout />}>
                      {t.account.logout}
                    </Button>
                  </SignOutButton>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RightSidebarTop;
