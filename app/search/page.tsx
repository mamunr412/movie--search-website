"use client";
import { fetchSearchMovie } from "@/api/movies.list.api";
import {
  Footer,
  LoadingSpinner,
  MovieCard,
  Navbar,
  ScrollToTop,
} from "@/components/global";
import { ExploreMovie } from "@/components/home";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { useEffect, useState } from "react";
import { IMovieResponse } from "@/interfaces/movies.response.interface";
import { colors } from "@/constants/colors";

const page = () => {
  const { inView, ref } = useInView();
  const searchParams = useSearchParams();
  const name: string | null = searchParams.get("name");
  const [nextPage, setNextPage] = useState<number>(1);
  console.log(name);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-search-movie", name],
      queryFn: ({ pageParam = 1 }) => {
        setNextPage(pageParam + 1);
        return fetchSearchMovie(String(name));
      },
      enabled: !!name,
      staleTime: 1000 * 24,
      getNextPageParam: () => nextPage,
    });

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  if (isLoading) {
    return <LoadingSpinner width={24} height={24} color="#818cf8" />;
  }

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 sm:px-3 xs:py-5 py-7 w-full">
        <div className="max-w-[80%] sm:max-w-full lg:max-w-[90%] mx-auto flex flex-col gap-y-2">
          <div className="w-full">
            <h4
              className={`text-lg font-semibold	 dark:text-white ${colors.title} font-medium`}
            >
              Results found: {name}
            </h4>
            <div className="w-full mt-4 grid grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 lg:gap-1 gap-3">
              {data?.pages
                .flatMap((item: any) => item)
                .map((movie: IMovieResponse, idx: number) => (
                  <MovieCard movie={movie} key={idx} />
                ))}
            </div>
            {isFetchingNextPage && (
              <LoadingSpinner width={24} height={24} color="#818cf8" />
            )}

            <div ref={ref}></div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default page;
