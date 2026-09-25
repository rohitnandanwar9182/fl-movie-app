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
    <header className="relative h-[70vh]">
      <div className="w-5/12 z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-center flex-col mb-4 gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-500 shadow-lg mb-4">
            <Popcorn className="h-7 w-7" />
          </div>

          <h1 className="text-7xl font-black tracking-tight ">Moviebox</h1>

          <p className="text-2xl tracking-tight font-light text-santas-gray mb-4 ">
            Discover the most popular trending movies right now
          </p>
        </div>

        <div className="relative h-12 ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-santas-gray" />
          <input
            className="mb-10 w-full h-full rounded-xl pl-10 pr-10 
            outline-none border-none bg-dark-black "
            placeholder="Search Movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 opacity-60 absolute inset-0">
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
    </header>
  );
};

export default HeroSection;
