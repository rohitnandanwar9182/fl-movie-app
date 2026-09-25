"use client"

import Image from "next/image";
import { Popcorn, Search } from "lucide-react";
import { IMAGE_PATH } from "@/constants";


interface IHeroSectionProps {
  movies: IMovie[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const HeroSection = ({ movies, searchTerm, setSearchTerm }: IHeroSectionProps) => {
  return (
    <header className="relative h-[60vh] min-h-[420px] overflow-hidden sm:h-[68vh] lg:h-[70vh]">
      <div className="absolute inset-0 grid grid-cols-2 gap-1 opacity-60 sm:grid-cols-3 lg:grid-cols-5">
        {movies.length >= 5  ? 
          movies.map((movie)=>
          <div key={movie.id}>
            <Image 
            className="h-full w-full object-cover"
            width={250}
            height={250} 
            alt={movie.title}
              src={
                    movie.poster_path
                      ? `${IMAGE_PATH}${movie.poster_path}`
                      : "/movie-img/movie-1.webp"
                  }
                  />
            </div>)
        : 
         Array(5)
          .fill(5)
          .map((_, index) => (
            <div key={index}>
              <Image
                src={`/movie-img/movie-${index + 1}.webp`}
                alt="Movies"
                className="h-full w-full object-cover"
                width={250}
                height={250} 
              />
            </div>
          ))}
        
        
      </div>

      <div
        className="absolute inset-0 bg-linear-to-t from-woodsmoke 
 via-woodsmoke/80 to-transparent "
      ></div>
      <div
        className="absolute inset-0 bg-linear-to-t from-woodsmoke/90
 via-transparent to-woodsmoke/90"
      ></div>

      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-xl">
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:gap-4">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 shadow-lg sm:mb-4 sm:h-14 sm:w-14">
              <Popcorn className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              Moviebox
            </h1>

            <p className="mb-2 text-center text-base tracking-tight font-light text-santas-gray sm:text-xl lg:text-2xl">
              Discover the most popular trending movies right now
            </p>
          </div>

          <div className="relative h-11 sm:h-12">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-santas-gray" />
            <input
              className="h-full w-full rounded-xl border-none bg-dark-black pl-10 pr-10 text-sm outline-none sm:text-base"
              placeholder="Search Movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
