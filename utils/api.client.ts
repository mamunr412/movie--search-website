import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3";
const api_key = "eed17629a8bb6984b44e3e2f229190df";
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWQxNzYyOWE4YmI2OTg0YjQ0ZTNlMmYyMjkxOTBkZiIsIm5iZiI6MTcyOTkxODA3MC40ODYzMSwic3ViIjoiNjcxYzczNGE1ZDBkZTg5MDQyZDkyOTkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Inq5t1pLaudkBZFkfiJBoOQcNc-pIE3SJZi613KgbB0";

const apiClient = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default apiClient;
