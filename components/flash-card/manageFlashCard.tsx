/* eslint-disable no-console */
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import toast from "react-hot-toast";
import { createFlashcard, deleteFlashcard, getFlashcards } from "@/actions/flashcard";
import { useMutation, useQuery } from "@tanstack/react-query";
import CardAdmin from "./card-admin";

export interface TFlashCard {
  name: string;
  content: Translation[];
}

export interface Translation {
  word: string;
  meaning: string;
}

function convertTextToArray(input: string): Translation[] {
  return input
    .split("\n") // Tách mỗi dòng thành mảng
    .map((line) => {
      const [word, meaning] = line.split(/\s*-\s*/); // Tách từ và nghĩa theo dấu "-"

      return { word: word.trim(), meaning: meaning.trim() }; // Tạo đối tượng { word, meaning }
    });
}

function ManageFlashCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState({
    name: "",
    content: [],
    tempContent: "",
  });

  const mutation = useMutation({
    mutationFn: () => handleCreate(),
    onSuccess: () => {
      onOpenChange();
      setValue({
        name: "",
        content: [],
        tempContent: "",
      });
      refetch();
    },
  });

  const mutationDel = useMutation({
    mutationFn: (id:string) => handleDelete(id),
    onSuccess: () => {
      refetch();
    },
  });

  const { data, refetch, isFetched } = useQuery({
    queryKey: ["flashcard-admin"],
    queryFn: () => getFlashcards(),
  });

  const handleCreate = async () => {
    if (value?.name === "" && value?.tempContent.length === 0) {
      toast.error("Vui lòng điền đầy đủ !");

      return;
    }

    const formatData = {
        name: value?.name,
        content: convertTextToArray(value?.tempContent),
    }

    const res = await createFlashcard(formatData);

    return res;
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFlashcard(id);
      
        if (res?.status === 200) {
            toast.success("Đã xoá Flash Card !");
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mutation.data?.status === 200) {
      toast.success("Đã tạo Flash Card mới !");
    } else if (mutation.data?.status === 500) {
      toast.error("Đã xảy ra lỗi !");
    } else if (mutation.data?.status === 403) {
      toast.error("Bạn không có quyền thay đổi !");
    }
  }, [mutation.data]);

  return (
    <>
      <div className="flex flex-col gap-4 relative">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Quản lý Flash Card</h1>
          <Button onPress={onOpen} color="primary" radius="sm">
            Thêm mới
          </Button>
        </div>
        {
          isFetched ? (<div className="grid grid-cols-3 gap-4">
            {data?.data?.map((item: any) => (
                <CardAdmin key={item.id} data={item} deleteFlashcard={mutationDel.mutate} />
            ))}
          </div>): <div className="flex items-center justify-center h-[200px]">
            <p>Đang tải ....</p>
          </div>
        }
      </div>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm mới
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 w-full pb-6">
                  <Input
                    label="Tên Flash Card"
                    labelPlacement="outside-left"
                    className="w-full"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />

                  <Textarea
                    label="Ghi chú"
                    labelPlacement="outside-left"
                    className="w-full"
                    value={value.tempContent}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tempContent: e.target.value,
                      })
                    }
                  />

                  <Button
                    isLoading={mutation?.isPending}
                    disabled={mutation?.isPending}
                    color="primary"
                    onPress={() => mutation.mutate()}
                  >
                    Thêm
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageFlashCard;
