"use client";
import HeroSection from "./components/HeroSection";
import { useEffect, useState } from "react";
import { API_URL, IMAGE_PATH } from "@/constants";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (query = "") => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY?.trim();

    if (!apiKey || apiKey.includes("YOUR_")) {
      setMovies([]);
      return;
    }

    try {
      const endpoint = query
        ? `${API_URL}/search/movie`
        : `${API_URL}/discover/movie`;

      const url = new URL(endpoint);
      url.searchParams.set("include_adult", "false");
      url.searchParams.set("language", "en-US");
      url.searchParams.set("page", "1");
      url.searchParams.set("api_key", apiKey);

      if (query) {
        url.searchParams.set("query", query);
      }

      const response = await fetch(url.toString(), {
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.log("TMDB fetch error:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <>
      <HeroSection
        movies={movies.slice(0, 5)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="mt-6 flex flex-col m-4 sm:m-6 lg:m-10">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="mb-2 text-2xl font-bold text-alabaster sm:text-3xl">
            {searchTerm ? `Results for ${searchTerm}` : "Popular Right Now"}
          </h2>
          <p className="text-sm text-santas-gray sm:text-lg">
            Explore what everyone is watching
          </p>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="px-4 pb-10 text-santas-gray sm:px-6 lg:px-10">
          {searchTerm.trim()
            ? "search a proper movie title"
            : "Add a valid TMDB API key in" + " " + "\u200b"}
          {searchTerm.trim() ? null : (
            <span className="font-semibold">.env</span>
          )}
          {searchTerm.trim() ? null : " to show real posters."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 px-4 pb-10 sm:grid-cols-2 sm:gap-5 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-10 xl:grid-cols-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl shadow-lg"
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-110 sm:h-[310px] lg:h-[340px]"
                  src={
                    movie.poster_path
                      ? `${IMAGE_PATH}${movie.poster_path}`
                      : "/placeholder-image.webp"
                  }
                  width={250}
                  height={340}
                  alt={movie.title}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-xl bg-black/70 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 text-saffron fill-saffron" />
                  <span className="text-sm font-semibold text-white">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className=" line-clamp-4 text-sm text-white/90 text-center">
                    {movie.overview}
                  </p>
                </div>
              </div>
              <div className="mt-3 p-1">
                <h3 className="font-semibold transition-colors group-hover:text-red-500">
                  {movie.title || "Untitled"}
                </h3>
                <p className="text-sm text-santas-gray">
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
