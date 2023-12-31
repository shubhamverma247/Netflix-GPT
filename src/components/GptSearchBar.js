import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";
import openai from "../utils/openai";
import { API_OPTIONS, gptQueryEnd, gptQueryStart } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    const query = gptQueryStart + searchText.current.value + gptQueryEnd;
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      //TODO: Write Error Handling
    }
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    //["Movie1","Movie2","Movie3","Movie4","Movie5"]

    //For each movie I search TMDB API

    const propmiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // returns array of promises [Promise,Promise,Promise,Promise,Promise]

    //Resolve all the promise to get data
    const tmdbResults = await Promise.all(propmiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  useEffect(() => {
    return () => dispatch(changeLanguage("en"));
  }, []);
  return (
    <div className="pt-[25%] md:pt-[10%] flex justify-center">
      <form
        className="w-screen m-4 md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className="m-3 p-3 md:p-4 md:m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}></input>
        <button
          className="col-span-3 m-3 px-3 md:m-4 md:px-4 py-2 bg-red-500 text-white rounded-md md:rounded-lg "
          onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
