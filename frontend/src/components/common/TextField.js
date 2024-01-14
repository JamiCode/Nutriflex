const TextField = ({ name, errorMessages }) => {
  const fieldType =
    name === "password" || name === "password2"
      ? "password"
      : name === "email"
      ? "email"
      : "text";

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-sm font-medium leading-6">
          {name}
        </label>
      </div>

      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={fieldType}
          autoComplete="new-password"
          required
          className="block w-full rounded-md border-0 py-2 text-black bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-sm"
        />
      </div>

      {errorMessages[name] && (
        <div className=" text-red-700" role="alert">
          <p>{errorMessages[name]}</p>
        </div>
      )}
    </div>
  );
};

export default TextField;
