import React from "react";
import { IMG_DEFAULT_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 pr-4">
      <img alt="movie img" src={`${IMG_DEFAULT_URL}${movie.poster_path}`} />
    </div>
  );
};

export default MovieCard;
