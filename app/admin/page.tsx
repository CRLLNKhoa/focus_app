import CardSpace from "@/components/card-space";
import { listBtnFilter } from "@/config/category";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

function AdminPage() {
  return (
    <div className="bg-[#232931] h-full pt-16 pl-[100px] pr-2 pb-2">
      <div className="relative h-full w-full bg-white rounded-lg px-4 flex flex-col overflow-y-auto noscroll-bar">
       <div className="flex flex-col gap-2 sticky top-0 z-50 bg-white pt-2">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">Quản lý các không gian</h1>
              <Button radius="sm" color="primary" startContent={<IconPlus />}>Thêm không gian</Button>
            </div>
            <div className="flex items-center gap-2 my-4 overflow-x-auto custom-scrollbar">
                {listBtnFilter.map((item) => (
                    <Button className="w-[200px]" variant="bordered" radius="sm" key={item.key}>
                        {item.label}
                    </Button>
                ))}
            </div>
       </div>
        <div className="grid grid-cols-6 gap-4 pb-2">
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
            <CardSpace />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
