"use client";

import "./index.css";
import { useState } from "react";
import { useRouter } from "next/router";

const auth = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const url = isRegistration ? "users" : "token";
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
            body: formData,
            headers: {
              API_KEY: headers.API_KEY,
            },
          };
      console.log("fetchObject", fetchObject);
      const response = await fetch(
        `${process.env.API_URL}/${url}`,
        fetchObject
      );
      console.log("resp", response);
      if (response) {
        const data = await response.json();
        if (!data.detail) {
          if (data.access_token) {
            sessionStorage.setItem("accessToken", data.access_token);
            router.push("/");
          } else if (Array.isArray(data)) {
            setIsShowMessage(true);
            setIsRegistration(false);
          }
        } else if (data.detail) {
          setErrorMessage(data.detail);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function showRegistration() {
    setIsRegistration(!isRegistration);
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
          <i>CareCompanion ChatBot</i>
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
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <p>{errorMessage}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={onSubmit} method="POST">
          {isRegistration ? <Registration /> : <Signin />}
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

const Registration = () => {
  return (
    <>
      {/* Email field */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="bg-gray-300 bg-slate-200 block w-full rounded-md border-0 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>
      {/* First name field */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6"
          >
            First Name
          </label>
        </div>

        <div className="mt-2">
          <input
            id="firstName"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            className="block w-full rounded-md border-0 py-2 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>
      {/* Last name field */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6"
          >
            Last Name
          </label>
        </div>

        <div className="mt-2">
          <input
            id="lastName"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            className="block w-full rounded-md border-0 py-2 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>
      {/* Password field */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6"
          >
            Password
          </label>
        </div>

        <div className="mt-2">
          <input
            id="password"
            name="hashed_password"
            type="password"
            autoComplete="new-password"
            required
            className="block w-full rounded-md border-0 py-2 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>
      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

const Signin = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
        </div>
        <div className="mt-2">
          <input
            id="email"
            name="username"
            type="email"
            autoComplete="email"
            required
            className="block w-full bg-slate-200 rounded-md border-0 py-2 text-black  focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-2 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:gray-500 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-500 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </>
  );
};
export default auth;
