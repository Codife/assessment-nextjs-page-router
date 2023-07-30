/* eslint-disable @next/next/no-img-element */
import { Header } from "@/components";
import globalClasses from "@/constants/globalClasses";
import { Book } from "@/constants/globaltypes";
import { calculateCurrentPage } from "@/utils/helpers";
import { fetchPage } from "@/utils/services/apiService";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface DetailProps {
  bookData: Book;
}

export default function Detail({ bookData }: DetailProps) {
  const router = useRouter();
  return (
    <main className="px-0 sm:px-[5%] lg:px-[20%] xl:px-[25%] 2xl:px-[30%] pb-10">
      <Header
        isDetail={true}
        title={bookData?.title ?? ""}
        onClick={() => router.push('/')}
      />
      <div className={globalClasses.detailImageContainer}>
        <img
          src={bookData?.coverImage ?? ""}
          alt={"image for" + bookData.title}
          className={globalClasses.detailImage}
        />
      </div>
      <div className="p-5">
        <h1 className={globalClasses.heading}>{bookData?.title ?? ""}</h1>
        <p>
          {bookData?.description?.replace(
            "~",
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          ) ?? ""}
        </p>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query, res } = context;
  const { bookId } = query;

  if (typeof bookId === "string" && /^\d+$/.test(bookId)) {
    const parsedBookId = parseInt(bookId);
    const currentPage = calculateCurrentPage(parsedBookId, 10);

    const index = 10 - (currentPage * 10 - parsedBookId);

    try {
      const response = await fetchPage(currentPage);
      const data = response.data.data;

      if (!!data) {
        const detail = data[index];

        return {
          props: {
            bookData: detail,
          },
        };
      } else {
        res.writeHead(302, { Location: "/" });
        res.end();
        return { props: {} };
      }
    } catch (error) {
      return {
        props: {
          bookData: {},
        },
      };
    }
  } else {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}
