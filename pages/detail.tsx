import globalClasses from "@/constants/globalClasses";
import { bookDataAtom } from "@/recoil/bookDataAtom";
import { useRecoilState } from "recoil";

export default function Detail() {
  const [bookData, setBooksData] = useRecoilState(bookDataAtom);
  return <main className={globalClasses.mainContainer}></main>;
}
