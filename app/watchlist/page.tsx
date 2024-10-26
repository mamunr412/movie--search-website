"use client";
import { Footer, Navbar, ScrollToTop } from "@/components/global";
import { colors } from "@/constants/colors";
import Image from "next/image";
import { useState, useEffect } from "react";

const WatchList = async () => {
  const [watchList, setWatchList] = useState([]);
  useEffect(() => {
    // Load data from localStorage when component mounts
    const savedData = localStorage.getItem("watchlist");
    const parseData = savedData ? JSON.parse(savedData) : [];
    setWatchList(parseData);
  }, []);
  const handelRemove = (id: number) => {
    const filterData = watchList?.filter((item: any) => item.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(filterData));
    setWatchList(filterData);
  };
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 sm:px-3 xs:py-5 py-7 w-full">
        <div className="max-w-[80%] sm:max-w-full lg:max-w-[90%] mx-auto flex flex-col gap-y-2">
          <div className="w-full">
            <h4
              className={`text-lg font-semibold	 dark:text-white ${colors.title} font-medium`}
            >
              Your watchList
            </h4>

            {watchList?.length ? (
              <>
                <div className="w-full mt-4 grid grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 lg:gap-1 gap-3">
                  {watchList?.map((movie: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <Image
                          width={250}
                          height={400}
                          className="rounded-md"
                          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                          alt={movie?.title}
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {movie.title}
                          </h2>
                          <div className="flex items-center space-x-1">
                            {/* <Star className="w-5 h-5 text-yellow-400" /> */}
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {movie.rating}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handelRemove(movie?.id)}
                          className="mt-4 w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-center py-16 text-gray-900 dark:text-white">
                  No data found
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default WatchList;
