import React from "react";
import Header from "./Header";
import useNowPlayingMoveis from "../hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMoveis from "../hooks/usePopularMovies";
const Browse = () => {
  useNowPlayingMoveis();
  usePopularMoveis();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
