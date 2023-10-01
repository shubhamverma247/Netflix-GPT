import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          alt="bg"
          className="h-screen md:w-screen object-cover"
          src={BG_URL}
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearchPage;
