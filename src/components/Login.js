import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateSignInForm, validateSignUpForm } from "../utils/validateForm";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  useDeviceLanguage,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignForm((previous) => !previous);
  };

  const submitForm = () => {
    if (isSignInForm) {
      const message = validateSignInForm(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      // signing in user
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}-${errorMessage}`);
        });
    } else {
      const message = validateSignUpForm(
        fullName.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/58245885?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
            });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}-${errorMessage}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          alt="bg"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl  py-4">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700"
        />
        {errorMessage && (
          <p className="font-bold text-red-600 text-xl">{errorMessage}</p>
        )}
        <button
          className="py-2 my-4 bg-red-600 w-full rounded-lg"
          onClick={submitForm}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer my-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
