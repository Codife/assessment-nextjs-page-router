import { Header, Loader, Product } from "@/components";
import globalClasses from "@/constants/globalClasses";
import { fetchPage } from "@/utils/services/apiService";
import Image from "next/image";
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
    setBooksData([...booksData, ...data.data.data]);
    if (!data.data.hasNext) {
      setMoreProductsAvailable(false);
    }
  }, [data]);

  const router = useRouter();

  return (
    <main className={globalClasses.mainContainer}>
      <Header isDetail={false} title="Books" onClick={() => null} />
      <section className={globalClasses.productsContainer}>
        {booksData.map((book, i) => {
          return (
            <Product
              key={Math.random() * 1000}
              {...book}
              onClick={() => {
                router.push(`/detail?bookId=${i}`);
                setBooksData([]);
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
