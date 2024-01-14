import TextField from "@/components/common/TextField";

const Signup = ({ errorMessages }) => {
  return (
    <>
      {/* Email field */}
      <TextField name="email" errorMessages={errorMessages} />

      {/* First name field */}
      <TextField name="first_name" errorMessages={errorMessages} />

      {/* Last name field */}
      <TextField name="last_name" errorMessages={errorMessages} />

      {/* Password field */}
      <TextField name="password" errorMessages={errorMessages} />

      {/* Repeat password */}
      <TextField name="password2" errorMessages={errorMessages} />

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default Signup;
