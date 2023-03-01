import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    iconurl: "",
    siteurl: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        name: credentials.name,
        iconurl: credentials.iconurl,
        siteurl: credentials.siteurl,
        note: credentials.note,
      })
    );

    const response = await fetch("https://backendtoto.vercel.app/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        iconurl: credentials.iconurl,
        siteurl: credentials.siteurl,
        note: credentials.note,
        date: credentials.date,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid cred..");
    }
    if (json.success) {
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Add a todo
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required=""
                    value={credentials.name}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="note"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Note..
                  </label>
                  <input
                    type="note"
                    name="note"
                    id="note"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="note"
                    required=""
                    value={credentials.note}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="note"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="date"
                    required=""
                    value={credentials.date}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="iconurl"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    iconurl
                  </label>
                  <input
                    type="url"
                    name="iconurl"
                    id="iconurl"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="iconurl"
                    value={credentials.iconurl}
                    onChange={onChange}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    siteurl
                  </label>
                  <input
                    type="siteurl"
                    name="siteurl"
                    id="siteurl"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="yoursiteurl"
                    value={credentials.siteurl}
                    onChange={onChange}
                    required=""
                  />
                </div>
                <div>
                  {/* <label
                    htmlFor="note"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    note
                  </label> */}
                  {/* <input
                    type="note"
                    name="note"
                    id="note"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={credentials.note}
                    onChange={onChange}
                    required=""
                  /> */}
                </div>
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div> */}
                {/* <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div> */}
                {/* </div> */}
                <button
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Add to-do..
                </button>
                <Link
                  to="/"
                  type="submit"
                  className="w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Go Back
                </Link>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
