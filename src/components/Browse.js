import React from "react";
import Header from "./Header";
import useNowPlayingMoviesnew from "../hooks/useNowPlayingMoviesnew";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMoveis from "../hooks/usePopularMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
const Browse = () => {
  const gptSearch = useSelector((store) => store.gpt.toggleGPT);
  useNowPlayingMoviesnew();
  usePopularMoveis();
  return (
    <div>
      <Header />
      {gptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
