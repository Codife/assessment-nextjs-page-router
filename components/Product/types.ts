import { Book } from "@/constants/globaltypes";

export type Props = Book & {
  onClick: () => void;
};