import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { Props } from "./type";

export default function Header({ title, onClick }: Props) {
  const router = useRouter();
  const isDetail = router.pathname === "/detail";
  return (
    <header className="flex justify-center items-center relative mx-4 my-4 sm:my-8 sm:mx-0">
      {isDetail && (
        <p
          className="h-10 w-10 flex justify-center items-center border-[1px] rounded-full bg-gray-200 absolute left-0 pr-[2px] cursor-pointer"
          onClick={onClick}
        >
          <Image src="/back.png" alt="top image" width={20} height={20} />
        </p>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      {!isDetail && (
        <div
          className="h-10 w-10 flex justify-center items-center border-[1px] rounded-full bg-gray-200 absolute right-0"
          onClick={onClick}
        >
          <Image
            src="/galleryIcon.png"
            alt="top image"
            width={20}
            height={20}
          />
        </div>
      )}
    </header>
  );
}
