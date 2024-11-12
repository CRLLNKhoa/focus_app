"use client";
import { cn } from "@/libs/utils";
import { useLangStore } from "@/stores/lang";
import { useToggleStore } from "@/stores/toggle";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  IconAdjustmentsHorizontal,
  IconBrandYoutubeKids,
  IconCalendarWeek,
  IconCards,
  IconLanguage,
  IconPencilMinus,
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
  const isShowTask = useToggleStore((state) => state.task);
  const toggleTask = useToggleStore((state) => state.toggleTask);
  const isShowFlashcard = useToggleStore((state) => state.flashcard);
  const toggleFlashcard = useToggleStore((state) => state.toggleFlashcard);
  const isShowDailyEnglish = useToggleStore((state) => state.englishDaily);
  const toggleDailyEnglish = useToggleStore(
    (state) => state.toggleEnglishDaily
  );

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
      <div className="bg-white shadow-lg dark:bg-[#232931] p-2 flex flex-col rounded-md gap-2">
      <Tooltip
          showArrow
          content="Spaces"
          placement="right"
          offset={12}
        >
          <Button
            variant="light"
            radius="sm"
            size="sm"
            onPress={() => handleToggle("space")}
            isIconOnly
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 gap-2",
              isShowSpace ? "text-[#E39685]" : "text-foreground-500"
            )}
            endContent={
              <p
                className={cn(
                  "-translate-y-1 text-foreground-500 mt-2",
                  isShowSpace ? "text-[#E39685]" : "text-foreground-500"
                )}
              >
                {t.menu.item1}
              </p>
            }
          >
            <IconWorld stroke={1.1} size={28} />
          </Button>
        </Tooltip>

        <Tooltip
          showArrow
          content="Soundboard"
          placement="right"
          offset={12}
        >
        <Button
          onPress={() => handleToggle("soundboard")}
          variant="light"
          radius="sm"
          size="sm"
          isIconOnly
          endContent={
            <p
              className={cn(
                "-translate-y-1 text-foreground-500 mt-2",
                isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
              )}
            >
              {t.menu.item2}
            </p>
          }
          className={cn(
            "flex flex-col items-center justify-center w-14 h-16 gap-2",
            isShowSoundboard ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconAdjustmentsHorizontal stroke={1.3} size={28} />
        </Button>
        </Tooltip>


        <Tooltip
          showArrow
          content="Event Calendar"
          placement="right"
          offset={12}
        >
        <Button
          onPress={() => handleToggle("calendar")}
          variant="light"
          radius="sm"
          size="sm"
          isIconOnly
          endContent={
            <p
              className={cn(
                "-translate-y-1 text-foreground-500 mt-2",
                isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
              )}
            >
              {t.menu.item3}
            </p>
          }
          className={cn(
            "flex flex-col items-center justify-center w-14 h-16 gap-2",
            isShowCalendar ? "text-[#E39685]" : "text-foreground-500"
          )}
        >
          <IconCalendarWeek stroke={1.8} size={28} />
        </Button>
        </Tooltip>
      </div>
      <div className="bg-white shadow-lg dark:bg-[#232931] p-2 rounded-md flex flex-col gap-2 overflow-x-auto noscroll-bar">
        <Tooltip showArrow content="Youtube" placement="right" offset={12}>
          <Button
            variant="light"
            radius="sm"
            size="sm"
            onPress={() => toggleMedia(!isShowMedia)}
            isIconOnly
            endContent={
              <p
                className={cn(
                  "-translate-y-1 text-foreground-500 mt-2",
                  isShowMedia ? "text-[#E39685]" : "text-foreground-500"
                )}
              >
                Media
              </p>
            }
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 gap-0",
              isShowMedia ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            <IconBrandYoutubeKids stroke={1.1} size={28} />
          </Button>
        </Tooltip>

        <Tooltip showArrow content="List Tasks" placement="right" offset={12}>
          <Button
            onPress={() => toggleTask(!isShowTask)}
            variant="light"
            radius="sm"
            size="sm"
            isIconOnly
            endContent={
              <p
                className={cn(
                  "-translate-y-1 text-foreground-500 mt-2",
                  isShowTask ? "text-[#E39685]" : "text-foreground-500"
                )}
              >
                Tasks
              </p>
            }
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 gap-2",
              isShowTask ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            <IconPencilMinus stroke={1.3} size={28} />
          </Button>
        </Tooltip>

        <Tooltip showArrow content="Flash Cards" placement="right" offset={12}>
          <Button
            onPress={() => toggleFlashcard(!isShowFlashcard)}
            variant="light"
            radius="sm"
            size="sm"
            isIconOnly
            endContent={
              <p
                className={cn(
                  "-translate-y-1 text-foreground-500 mt-2",
                  isShowFlashcard ? "text-[#E39685]" : "text-foreground-500"
                )}
              >
                Cards
              </p>
            }
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 gap-2",
              isShowFlashcard ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            <IconCards stroke={1.5} size={28} />
          </Button>
        </Tooltip>

        <Tooltip
          showArrow
          content="Daily English"
          placement="right"
          offset={12}
        >
          <Button
            onPress={() => toggleDailyEnglish(!isShowDailyEnglish)}
            variant="light"
            radius="sm"
            size="sm"
            isIconOnly
            endContent={
              <p
                className={cn(
                  "-translate-y-1 text-foreground-500 mt-2",
                  isShowDailyEnglish ? "text-[#E39685]" : "text-foreground-500"
                )}
              >
                Daily
              </p>
            }
            className={cn(
              "flex flex-col items-center justify-center w-14 h-16 gap-2",
              isShowDailyEnglish ? "text-[#E39685]" : "text-foreground-500"
            )}
          >
            <IconLanguage stroke={1.5} size={28} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default LeftMenuApp;
