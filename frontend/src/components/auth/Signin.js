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
            name="email"
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

export default Signin;
