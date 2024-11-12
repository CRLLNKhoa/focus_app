"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button } from "@nextui-org/button";
import {
  IconCalendarPlus,
  IconCaretLeft,
  IconEdit,
  IconLoader3,
  IconTrash,
} from "@tabler/icons-react";
import { useToggleStore } from "@/stores/toggle";
import { AnimatePresence, motion } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { CalendarDateTime, now, parseDateTime } from "@internationalized/date";
import { TEvent } from "@/types";
import { Select, SelectItem } from "@nextui-org/select";
import { createEvent, deleteEvent, getEvents } from "@/actions/calendar";
import toast from "react-hot-toast";
import { useLangStore } from "@/stores/lang";

const updateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm 0 nếu < 10
  const day = String(date.getDate()).padStart(2, "0"); // Thêm 0 nếu < 10

  return `${year}-${month}-${day}`;
};

function Calendar() {
  const isShow = useToggleStore((state) => state.calendar);
  const toggleShow = useToggleStore((state) => state.toggleCalendar);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const [color, setColor] = useState("#5e72e4");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState({
    start: parseDateTime("2024-04-01T00:45"),
    end: parseDateTime("2024-04-08T11:15"),
  });
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(updateTime());
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const t = useLangStore((state) => state.lang);

  useEffect(() => {
    const updateTime = () => {
      const currentDate = now("+07:00");
      const formattedDate = `${currentDate.year}-${String(currentDate.month).padStart(2, "0")}-${String(currentDate.day).padStart(2, "0")}T${String(currentDate.hour).padStart(2, "0")}:${String(currentDate.minute).padStart(2, "0")}`;

      setDate({
        start: parseDateTime(formattedDate),
        end: parseDateTime(formattedDate),
      });
    };

    // Cập nhật thời gian ngay khi component được mount
    updateTime();
  }, [isOpen]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents(String(currentDate));

        if (res?.status === 200) {
          setEvents(res.data);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchEvents(); // Gọi API với giá trị input
    }, 1000); // Thời gian debounce 1 giây

    return () => {
      clearTimeout(handler); // Cleanup
    };
  }, [currentDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    // Tạo CalendarDateTime cho start và end
    const startDate = new CalendarDateTime(
      date.start.year,
      date.start.month,
      date.start.day,
      date.start.hour,
      date.start.minute
    );

    const endDate = new CalendarDateTime(
      date.end.year,
      date.end.month,
      date.end.day,
      date.end.hour,
      date.end.minute
    );

    if (title === "" || description === "") {
      toast.error("Vui lòng nhập đầy đủ các trường !");
      setIsLoading(false);

      return;
    }

    try {
      const res = await createEvent({
        id: crypto.randomUUID(),
        title: title,
        start: startDate.toString(),
        end: endDate.toString(),
        description: description,
        color: color,
      });

      if (res?.status === 200) {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            id: crypto.randomUUID(),
            title: title,
            start: startDate.toString(),
            end: endDate.toString(),
            description: description,
            color: color,
          },
        ]);

        setTitle("");
        setDescription("");
        onOpenChange();
        toast.success("Đã thêm sự kiện !");

        return;
      } else {
        toast.error("Đã xảy ra lỗi 1!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi !");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsLoadingDel(true);
    try {
      const res = await deleteEvent(id);

      if (res?.status === 200) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        toast.success("Đã xoá sự kiện !");

        return;
      }else{
        toast.error("Đã xảy ra lỗi !");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setIsLoadingDel(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -100, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-[90px] bg-white bottom-2 w-[420px]
              dark:bg-[#232931] p-2 flex flex-col rounded-md gap-2 z-50 shadow-xl"
          >
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="animate-spin">
                  <IconLoader3 stroke={1.5} className="size-10" />
                </div>
                <p>Đang tải...</p>
              </div>
            ) : (
              <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridDay"
                views={{
                  timeGridDay: {
                    type: "timeGridOneDay",
                    duration: {
                      days: 1,
                    },
                  },
                }}
                height={"100%"}
                eventMinWidth={100}
                slotMinWidth={100}
                events={events}
                datesSet={(e) => {
                  setCurrentDate(e.startStr.slice(0, 10));
                }}
              />
            )}

            <div className="bg-white dark:bg-[#232931] absolute top-10 left-[100%] rounded-e-lg">
              <Button
                onPress={() => toggleShow(false)}
                variant="light"
                isIconOnly
                radius="sm"
              >
                <IconCaretLeft stroke={1.5} />
              </Button>
            </div>

            <div className="bg-white dark:bg-[#232931] absolute top-24 left-[100%] rounded-e-lg pr-1 py-2">
              <Button onPress={onOpen} variant="light" isIconOnly radius="none">
                <IconCalendarPlus stroke={1.5} />
              </Button>
              <Button
                onPress={onOpenEdit}
                variant="light"
                isIconOnly
                radius="none"
              >
                <IconEdit stroke={1.5} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>{t.modalAdd.title}</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 pb-6">
                    <Input
                      required
                      type="text"
                      label={t.modalAdd.titleInputTitle}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                      required
                      type="text"
                      label={t.modalAdd.titleInputDescription}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Select
                      required
                      onChange={(e) => setColor(e.target.value)}
                      label={t.modalAdd.titleInputColor}
                      className="max-w-xs"
                    >
                      <SelectItem className="bg-[#F08080]" key={"#F08080"}>
                        Light Coral
                      </SelectItem>
                      <SelectItem className="bg-[#FF4500]" key={"#FF4500"}>
                        Orange Red
                      </SelectItem>
                      <SelectItem className="bg-[#FFD700]" key={"#FFD700"}>
                        Gold
                      </SelectItem>
                      <SelectItem className="bg-[#8B0000]" key={"#8B0000"}>
                        Dark Red
                      </SelectItem>
                      <SelectItem
                        className="bg-[#00CED1] text-white"
                        key={"#00CED1"}
                      >
                        Turquoise
                      </SelectItem>
                    </Select>
                    <DateRangePicker
                      hideTimeZone
                      fullWidth
                      granularity="minute"
                      label="Date and time range"
                      value={date}
                      onChange={setDate}
                    />
                  </div>
                  <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    color="primary"
                    className="ml-auto"
                    type="submit"
                  >
                    {t.modalAdd.titleButton}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal size="xl" isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>{t.modalEdit.title}</ModalHeader>
              <ModalBody className="pb-6">
                {events.map((event) => (
                  <div key={event.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span
                        className={`bg-[${event.color}] px-4 text-white rounded-sm`}
                      >
                        {event.start.slice(11, 16)} - {event.end.slice(11, 16)}
                      </span>
                      <span title={event.title} className="line-clamp-1 flex-1">{event.title}</span>
                      <Button
                        isLoading={isLoadingDel}
                        onPress={() => handleDelete(event.id)}
                        variant="light"
                        isIconOnly
                        radius="sm"
                        className="ml-auto"
                      >
                        <IconTrash color="red" stroke={1.5} />
                      </Button>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <p>{t.modalEdit.titleEmpty}</p>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Calendar;
