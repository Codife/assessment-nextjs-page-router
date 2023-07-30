import { Data } from "@/constants/globaltypes";

export const handleScroll = (
  data: Data | undefined,
  setCurrentPage: (e: number) => void,
  setHasFetched: (e: boolean) => void,
  currentPage: number
) => {
  const pageHeight = document.documentElement.scrollHeight;
  const eightyPercentScroll = pageHeight * 0.8;
  const scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition >= eightyPercentScroll) {
    if (!!data && "data" in data && data["data"].hasNext) {
      setCurrentPage(currentPage + 1);
      setHasFetched(false);
    }
  }
};

export const calculateCurrentPage = (
  bookNumber: number,
  booksPerPage: number
) => {
  return Math.floor(bookNumber / booksPerPage) + 1;
};
