import React, { useEffect } from "react";
import Header from "./Header";
import useNowPlayingMoveis from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
const Browse = () => {
  useNowPlayingMoveis();
  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  );
};

export default Browse;
