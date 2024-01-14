"use client";

import "./index.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Signin from "@/components/auth/Signin";
import Signup from "@/components/auth/Signup";

const auth = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  const [errorMessages, setErrorMessages] = useState({});
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessages({});

    const formData = new FormData(event.currentTarget);
    console.log("formData", formData);

    const url = isRegistration ? "users/create" : "users/token";
    try {
      console.log(process.env.API_KEY);
      const headers = {
        API_KEY: process.env.API_KEY,
        "Content-Type": "application/json",
      };
      let formDataJson = {};

      formData.forEach((value, key) => {
        formDataJson[key] = value;
      });

      const fetchObject = isRegistration
        ? {
            method: "POST",
            body: JSON.stringify(formDataJson),
            headers: {
              API_KEY: headers.API_KEY,
              "Content-Type": "application/json",
            },
          }
        : {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataJson),
          };
      console.log("env url", process.env.API_URL);
      console.log("fetchObject", fetchObject);
      const response = await fetch(`/api/${url}`, fetchObject);
      console.log("resp", response);
      if (response) {
        const data = await response.json();
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          if (data.access) {
            sessionStorage.setItem("accessToken", data.access);
            router.push("/dashboard");
          } else {
            setIsShowMessage(true);
            setIsRegistration(false);
          }
        } else {
          console.log("data-error", data);

          const isKeyIncludeInError = [
            "email",
            "first_name",
            "last_name",
            "password",
            "password2",
          ].some((errorKey) => data[errorKey]);
          console.log("isKeyIncludeInError", isKeyIncludeInError);
          setErrorMessages(data);
          if (!isRegistration || !isKeyIncludeInError) {
            setIsShowErrorMessage(true);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function showRegistration() {
    setIsRegistration(!isRegistration);
    setIsShowMessage(false);
    setErrorMessages({});
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img
          src="./care-bot.png"
          alt="Company Logo"
          className="mx-auto"
          width="140"
        />

        <h1 className="text-4xl font-bold mb-4">
          <i>Nutriflex</i>
        </h1>
        <h2 className="text-2xl font-bold mb-8">Login into your account</h2>

        {isShowMessage ? (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">You created a new user</p>
            <p className="text-sm">Input data to sign in.</p>
          </div>
        ) : (
          ""
        )}

        {isShowErrorMessage &&
          Object.keys(errorMessages).map((errorMessage) => {
            return (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
                key={errorMessage}
              >
                <p>{errorMessages[errorMessage]}</p>
              </div>
            );
          })}

        <form className="space-y-6" onSubmit={onSubmit} method="POST">
          {isRegistration ? (
            <Signup errorMessages={errorMessages} />
          ) : (
            <Signin />
          )}
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          {isRegistration ? "" : `Don't have an account? `}
          <a
            onClick={showRegistration}
            className="font-semibold text-indigo-500 hover:text-indigo-400 hover:cursor-pointer"
          >
            {isRegistration ? "Sign In" : "Click Here to create one"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default auth;
