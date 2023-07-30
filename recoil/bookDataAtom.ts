import { Book } from "@/constants/globaltypes";
import { atom } from "recoil";

export const bookDataAtom = atom<Book[] | []>({
  key: "bookData",
  default: [],
});
