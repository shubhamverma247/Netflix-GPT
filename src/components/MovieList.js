import React from "react";
import MovieCard from "./MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieList = ({ title, movies, rowID }) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div className="px-6">
      <h1 className="txt-xl md:text-3xl py-4 text-white">{title}</h1>

      <div
        className="flex overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar"
        id={"slider" + rowID}>
        <div className="flex">
          <div
            className="pt-[100px] 
          ">
            <MdChevronLeft
              onClick={slideLeft}
              className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10   group-hover:block"
              size={40}
            />
          </div>

          {movies &&
            movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          <div className="pt-[100px] ">
            <MdChevronRight
              onClick={slideRight}
              className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  group-hover:block"
              size={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
