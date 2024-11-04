"use client";
import { cn } from "@/libs/utils";
import { useLangStore } from "@/stores/lang";
import { useToggleStore } from "@/stores/toggle";
import { Button } from "@nextui-org/button";
import {
  IconAdjustmentsHorizontal,
  IconBrandYoutubeKids,
  IconCalendarWeek,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

function LeftMenuApp() {
  const t = useLangStore((state) => state.lang);
  const toggleCalendar = useToggleStore((state) => state.toggleCalendar);
  const isShowCalendar = useToggleStore((state) => state.calendar);
  const isShowSoundboard = useToggleStore((state) => state.soundboard);
  const toggleSoundboard = useToggleStore((state) => state.toggleSoundboard);
  const isShowSpace = useToggleStore((state) => state.space);
  const toggleSpace = useToggleStore((state) => state.toggleSpace);
  const isShowMedia = useToggleStore((state) => state.media);
  const toggleMedia = useToggleStore((state) => state.toggleMedia);

  const handleToggle = (tab: "calendar" | "soundboard" | "space") => {
    if (tab === "calendar") {
      if (isShowCalendar) {
        toggleCalendar(false);
      } else {
        toggleCalendar(true);
        toggleSoundboard(false);
        toggleSpace(false);
      }
    } else if (tab === "soundboard") {
      if (isShowSoundboard) {
        toggleSoundboard(false);
      } else {
        toggleSoundboard(true);
        toggleCalendar(false);
        toggleSpace(false);
      }
    } else if (tab === "space") {
      if (isShowSpace) {
        toggleSpace(false);
      } else {
        toggleSpace(true);
        toggleCalendar(false);
        toggleSoundboard(false);
      }
    }
  };

  return (
    <div className="absolute top-16 bottom-2 left-2 flex flex-col gap-3">
      <div className="w-[82px] bg-white shadow-lg dark:bg-[#232931] p-2 flex flex-col rounded-md gap-2">
        <Button
          variant="light"
          radius="sm"
          size="sm"
          onPress={() => handleToggle("space")}
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowSpace ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconWorld stroke={1.1} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowSpace ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            {t.menu.item1}
          </p>
        </Button>
        <Button
          onPress={() => handleToggle("soundboard")}
          variant="light"
          radius="sm"
          size="sm"
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconAdjustmentsHorizontal stroke={1.3} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            {t.menu.item2}
          </p>
        </Button>
        <Button
          onPress={() => handleToggle("calendar")}
          variant="light"
          radius="sm"
          size="sm"
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconCalendarWeek stroke={1.8} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            {t.menu.item3}
          </p>
        </Button>
      </div>
      <div className="w-[82px] bg-white shadow-lg dark:bg-[#232931] p-2 rounded-md space-y-2 overflow-x-auto noscroll-bar">
        <Button
          variant="light"
          radius="sm"
          size="sm"
          onPress={() => toggleMedia(!isShowMedia)}
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowMedia ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconBrandYoutubeKids stroke={1.1} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowMedia ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            Media
          </p>
        </Button>
        <Button
          onPress={() => handleToggle("soundboard")}
          variant="light"
          radius="sm"
          size="sm"
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconAdjustmentsHorizontal stroke={1.3} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            {t.menu.item2}
          </p>
        </Button>
        <Button
          onPress={() => handleToggle("calendar")}
          variant="light"
          radius="sm"
          size="sm"
          className={cn(
            "flex flex-col items-center justify-center h-16 gap-0",
            isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconCalendarWeek stroke={1.8} className="h-16 w-16" />
          <p
            className={cn(
              "-translate-y-1 text-foreground-500",
              isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            {t.menu.item3}
          </p>
        </Button>
      </div>
    </div>
  );
}

export default LeftMenuApp;
