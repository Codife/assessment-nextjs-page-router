import { Header, Loader, Product } from "@/components";
import globalClasses from "@/constants/globalClasses";
import { fetchPage } from "@/utils/services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { bookDataAtom } from "@/recoil/bookDataAtom";
import { useRecoilState } from "recoil";
import { handleScroll } from "@/utils/helpers";
import { useRouter } from "next/router";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);
  const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

  const [booksData, setBooksData] = useRecoilState(bookDataAtom);

  const { data, isLoading, error } = useQuery({
    queryKey: ["page", currentPage],
    queryFn: () => fetchPage(currentPage),
    enabled: !hasFetched,
  });

  useEffect(() => {
    if (hasFetched) {
      document.addEventListener("scroll", () => {
        handleScroll(data, setCurrentPage, setHasFetched, currentPage);
      });

      return () => {
        document.removeEventListener("scroll", () =>
          handleScroll(data, setCurrentPage, setHasFetched, currentPage)
        );
      };
    }
  }, [currentPage, data, hasFetched]);

  useEffect(() => {
    if (!isLoading) {
      setHasFetched(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!data) return;
    if (!Array.isArray(booksData) || !Array.isArray(data?.data?.data)) {
      console.error("Invalid data format. Expected arrays.");
      return;
    }

    const newData = [...booksData, ...data.data.data];

    setBooksData(newData);
    if (!data.data.hasNext) {
      setMoreProductsAvailable(false);
    }
  }, [data]);

  const router = useRouter();

  return (
    <main className="px-0 sm:px-[5%] lg:px-[20%] xl:px-[25%] 2xl:px-[30%] pb-10">
      <Header isDetail={false} title="Books" onClick={() => null} />
      <section className="flex justify-between flex-wrap h-full w-full xl:mb-[10%]">
        {booksData.map((book, i) => {
          return (
            <Product
              key={Math.random() * 1000}
              {...book}
              onClick={() => {
                setBooksData([]);
                router.push(`/detail?bookId=${i}`);
              }}
            />
          );
        })}
      </section>
      {isLoading && <Loader />}
      {!moreProductsAvailable && !isLoading && (
        <div className={globalClasses.productsEnded}>No more products!</div>
      )}
    </main>
  );
}
