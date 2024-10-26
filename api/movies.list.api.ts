import apiClient from "@/utils/api.client";
export const api_key = "eed17629a8bb6984b44e3e2f229190df";
export const fetchMoviesByTopRated = async () => {
  try {
    const { data } = await apiClient.get(
      `/movie/popular?api_key=${api_key}&page=1&per_page=20`
    );
    if (data) {
      const { results } = data;
      return results;
    }
  } catch (err: any) {
    const {
      response: { data },
    } = err;
    throw new Error(data.message);
  }
};
export const fetchSearchMovie = async (name: string) => {
  try {
    const { data } = await apiClient.get(
      `/search/movie?api_key=${api_key}&query=${name}&page=1&per_page=20`
    );
    if (data) {
      const { results } = data;
      return results;
    }
  } catch (err: any) {
    const {
      response: { data },
    } = err;
    throw new Error(data.message);
  }
};
export const fetchMoviesByPopuler = async () => {
  try {
    const { data } = await apiClient.get(
      `/movie/popular?api_key=${api_key}&page=1&per_page=10`
    );
    if (data) {
      const { results } = data;
      return results;
    }
  } catch (err: any) {
    const {
      response: { data },
    } = err;
    throw new Error(data.message);
  }
};

export const fetchExploreMovie = async (pageParam: number) => {
  try {
    const { data } = await apiClient.get(
      `/movie/popular?api_key=${api_key}&page=${pageParam}&per_page=10`
    );
    if (data) {
      const { results } = data;
      return results;
    }
  } catch (err: any) {
    const {
      response: { data },
    } = err;
    throw new Error(data.message);
  }
};
