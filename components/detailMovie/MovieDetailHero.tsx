"use client";
import { fetchMovieById } from "@/api/movie.detail.api";
import { useQuery } from "react-query";
import Image from "next/image";
import { LoadingSpinner } from "../global";
import Link from "next/link";

type MovieDetailHeroProps = {
  movieId: string | number;
};

const MovieDetailHero = ({ movieId }: MovieDetailHeroProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-movie-by-id", movieId],
    queryFn: () => fetchMovieById(movieId),
  });
  const savedData = localStorage.getItem("watchlist");
  const parseData = savedData ? JSON.parse(savedData) : [];

  const find = parseData?.find(
    (item: any) => Number(item.id) === Number(movieId)
  );

  const toggleWatchlist = () => {
    let newWatchlist;
    if (find?.id) {
      newWatchlist = parseData.filter(
        (item: any) => item.id !== Number(movieId)
      );
      console.log(newWatchlist);
    } else {
      newWatchlist = [...parseData, data];
    }
    // Update localStorage
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  if (isLoading) {
    return <LoadingSpinner width={24} height={24} color="#818cf8" />;
  }
  return (
    <div
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="w-full h-[100vh] xs:py-5 xs:overflow-y-scroll relative"
    >
      <div className="w-full h-full bg-gray-900/50 flex justify-center items-center">
        <div className="max-w-[80%] lg:max-w-[90%] sm:max-w-full sm:px-3 sm:flex-col sm:items-center flex items-start gap-x-7">
          <Image
            width={250}
            height={400}
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            alt={data?.title}
          />
          <div className="flex-1 sm:mt-7">
            <h2 className="text-xl font-bold text-white">{data?.title}</h2>
            <div className="flex mt-2 items-center gap-x-3">
              <p className="flex items-center gap-x-2 text-[13px] text-white">
                <i className="ri-timer-2-line text-[16px]"></i>
                {data?.runtime} minutes
              </p>
              <p className="flex items-center gap-x-2 text-[13px] text-white">
                <i className="ri-exchange-dollar-line text-[16px]"></i>
                {new Intl.NumberFormat("en-US", {
                  currency: "USD",
                  style: "currency",
                }).format(data?.revenue)}{" "}
              </p>
              <p className="flex items-center gap-x-2 text-[13px] text-white">
                <i className="ri-funds-line text-[16px]"></i>
                {Math.ceil(data?.vote_average)}
              </p>
            </div>
            <p className="text-[12px] mt-3 text-white mb-5">{data?.overview}</p>
            <div className="max-w-[88%] lg:max-w-full  flex items-center ">
              <p className="text-lg text-white mr-2"> Genres : </p>
              {data?.genres?.map((item: any, idx: number) => (
                <Link
                  // className="w-full block"
                  href={`/genre/${item.id}`}
                  key={idx}
                >
                  <span className="bg-indigo-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                    {" "}
                    {item?.name}
                  </span>
                </Link>
              ))}
            </div>
            <div>
              <button
                onClick={toggleWatchlist}
                className={`bg-indigo-400 text-white mt-10 px-2 py-1 rounded`}
              >
                {find?.id ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailHero;
