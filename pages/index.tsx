import { Product } from "@/components";
import globalClasses from "@/constants/globalClasses";
import { fetchPage } from "@/utils/services/apiService";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { bookDataAtom } from "@/recoil/bookDataAtom";
import { useRecoilState } from "recoil";
import { handleScroll } from "@/utils/helpers";
import Link from "next/link";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);

  const [booksData, setBooksData] = useRecoilState(bookDataAtom);

  const { data, isLoading, error } = useQuery({
    queryKey: ["page", currentPage],
    queryFn: () => fetchPage(currentPage),
    enabled: !hasFetched,
  });

  useEffect(() => {
    if (hasFetched) {
      document.addEventListener("scroll", () =>
        handleScroll(data, setCurrentPage, setHasFetched, currentPage)
      );

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
    console.log(currentPage)
    setBooksData([...booksData, ...data.data.data]);
  }, [data]);

  return (
    <Link href="/detail">
      <main className={globalClasses.mainContainer}>
        <header className={globalClasses.headerContainer}>
          <h1 className={globalClasses.heading}>Books</h1>
          <div className={globalClasses.topImageContainer}>
            <Image
              src="/galleryIcon.png"
              alt="top image"
              width={20}
              height={20}
            />
          </div>
        </header>
        <section className={globalClasses.productsContainer}>
          {Array(10)
            .fill(2)
            .map((e) => {
              return <Product key={Math.random() * 1000} />;
            })}
        </section>
      </main>
    </Link>
  );
}
