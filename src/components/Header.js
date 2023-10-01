import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearch } from "../utils/gptSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useRef(null);
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.toggleGPT);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const handleToggle = () => {
    dispatch(toggleGPTSearch());
  };
  const handleLanguageChange = (e) => {
    // or we can use e.target.value
    dispatch(changeLanguage(language.current.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe onauthstatechange callback
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2  bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between">
      <img className="mx-auto w-32 md:w-44 md:m-0" alt="logo" src={LOGO_URL} />
      {user && (
        <div className="flex justify-between mt-2">
          {showGptSearch && (
            <select
              ref={language}
              className=" mx-4 bg-gray-600 px-2 text-white h-8"
              onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-2 h-8 bg-purple-900 mr-4 text-white font-bold rounded-md"
            onClick={handleToggle}>
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="hidden md:inline-block w-8 h-8 px-1"
            alt="user"
            src={user.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white font-bold border w-24 h-8   ">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
