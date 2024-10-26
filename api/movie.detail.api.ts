import apiClient from "@/utils/api.client";
import { api_key } from "./movies.list.api";

export const fetchMovieById = async (movieId: string | number) => {
  try {
    const { data } = await apiClient.get(`/movie/${movieId}api_key=${api_key}`);
    return data;
  } catch (err: any) {
    throw new Error("error");
  }
};

export const fetchMovieCredit = async (movieId: string | number) => {
  try {
    const { data } = await apiClient.get(
      `/movie/${movieId}/credits?api_key=${api_key}`
    );
    return data.cast;
  } catch (err: any) {
    throw new Error("error");
  }
};

export const fetchSimilarMovie = async (movieId: string | number) => {
  try {
    const { data } = await apiClient.get(
      `/movie/${movieId}/similar?api_key=${api_key}&page=1`
    );
    return data.results;
  } catch (err) {
    throw new Error("error");
  }
};
