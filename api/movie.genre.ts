import apiClient from "@/utils/api.client";
import { api_key } from "./movies.list.api";

export const fetchMovieByGenre = async ({
  genreId,
  page,
}: {
  genreId: string | number;
  page: number;
}) => {
  try {
    const { data } = await apiClient.get(
      `/discover/movie?api_key=${api_key}&with_genres=${genreId}&page=${page}&per_page=10`
    );
    return data;
  } catch (err) {
    throw new Error("error");
  }
};
