"use client";
import { createSpace, getSpaces } from "@/actions/space";
import { listBtnFilter } from "@/config/category";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { TSpace } from "@/types";
import toast from "react-hot-toast";
import CardSpaceAdmin from "@/components/card-space-admin";

function ManageSpace() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const mutation = useMutation({
    mutationFn: () => handleCreate(),
    onSuccess: () => {
      onOpenChange();
      setInputValue({
        title: "",
        key: "",
        view: 0,
        link: "",
        src: "",
        image: "",
      });
      refetch();
    },
  });
  const [filter, setFilter] = useState<TSpace[]>([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (mutation.data?.status === 200) {
      toast.success("Đã tạo không gian mới !");
    } else if (mutation.data?.status === 500) {
      toast.error("Đã xảy ra lỗi !");
    } else if (mutation.data?.status === 403) {
      toast.error("Bạn không có quyền thay đổi !");
    }
  }, [mutation.data]);

  const [inputValue, setInputValue] = useState<TSpace>({
    title: "",
    key: "",
    view: 0,
    link: "",
    src: "",
    image: "",
  });

  const { data, error, refetch, isFetched } = useQuery({
    queryKey: ["space-admin"],
    queryFn: () => getSpaces(),
  });

  useEffect(() => {
    setFilter(data?.data || []);
  }, [isFetched]);

  if (error) {
    return (
      <div className="bg-[#232931] h-full pt-16 pl-[100px] pr-2 pb-2">
        <h1>error</h1>
      </div>
    );
  }

  if (!isFetched) {
    return (
      <div className="bg-white h-full pt-16 pl-[100px] pr-2 pb-2">
        <div
          className="relative h-full w-full bg-white rounded-lg px-4 
          flex flex-col items-center justify-center overflow-y-auto noscroll-bar"
        >
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const handleCreate = async () => {
    if (
      inputValue?.title === "" &&
      inputValue?.key === "" &&
      inputValue?.link === "" &&
      inputValue?.src === "" &&
      inputValue?.image === ""
    ) {
      toast.error("Vui lòng điền đầy đủ !");

      return;
    }

    const res = await createSpace(inputValue);

    return res;
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sticky top-0 z-50 bg-white pt-2">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl">Quản lý các không gian</h1>
            <Button
              onPress={onOpen}
              radius="sm"
              color="primary"
              startContent={<IconPlus />}
            >
              Thêm không gian
            </Button>
          </div>
          <div className="flex items-center gap-2 my-4 overflow-x-auto custom-scrollbar">
            {listBtnFilter.map((item) => (
              <Button
                className=""
                variant={key === item.key ? "solid" : "bordered"}
                radius="sm"
                key={item.key}
                onPress={() => {
                  setFilter(
                    data?.data.filter((btn) => btn.key === item.key) || []
                  );
                  setKey(item.key);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 pb-2">
          {filter.map((item) => (
            <CardSpaceAdmin key={item.id} data={item} />
          ))}
        </div>
      </div>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm không gian mới
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <Input
                    required
                    value={inputValue.title}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, title: e.target.value })
                    }
                    type="text"
                    label="Tên không gian"
                  />
                  <Input
                    required
                    value={inputValue.src}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, src: e.target.value })
                    }
                    type="text"
                    label="Nguồn"
                  />
                  <Input
                    required
                    value={inputValue.link}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, link: e.target.value })
                    }
                    type="text"
                    label="Liên kết Youtube"
                  />
                  <Input
                    required
                    value={inputValue.image}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, image: e.target.value })
                    }
                    type="text"
                    label="Ảnh nền"
                  />
                  <Select
                    required
                    label="Chọn chủ đề"
                    className="max-w-xs"
                    value={inputValue.key}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        key: String(e.target.value),
                      })
                    }
                  >
                    {listBtnFilter.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  isLoading={mutation?.isPending}
                  disabled={mutation?.isPending}
                  color="primary"
                  onPress={() => mutation.mutate()}
                >
                  Thêm mới
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageSpace;
