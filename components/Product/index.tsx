/* eslint-disable @next/next/no-img-element */
import classes from "./classnames";
import { Props } from "./types";

export default function Product({
  coverImage,
  discountRate,
  title,
  price,
  onClick,
}: Props) {
  return (
    <div
      className="w-[48%] sm:w-[29%] h-40 grow-0 aspect-square mb-8 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-[90%] w-full bg-gray-200">
        <img
          src={coverImage}
          className="h-full w-full object-contain"
          alt={"image for " + title}
        />
      </div>
      <div className="flex flex-col h-10">
        <div className="w-full h-full">{title}</div>
        <div className="w-fullh-full flex justify-between items-center">
          <p className="text-red-400">{discountRate + "%"}</p>{" "}
          <p>{"$" + price}</p>
        </div>
      </div>
    </div>
  );
}
