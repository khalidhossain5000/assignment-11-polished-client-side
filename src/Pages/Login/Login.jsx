import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import bgImg from "../../assets/AuthBg/monutain-darsk.jpg";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const LogIn = () => {
  const { logInUser, handleGoogleUser } = useAuth();
  const logInLocation = useLocation();
  const navigate = useNavigate();
  const [wrongPassword, setWrongPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());
    setWrongPassword("");
    // FIREBASE USER
    logInUser(email, password)
      .then((result) => {
        toast.success(`Logged In SuccessFully`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right, #31c3df, #3a47d5)",
          },
        });
        console.log(result);
        // navigate(`${logInLocation.state ? logInLocation.state : "/"}`);
        navigate(`${logInLocation.state?.from || "/"}`, { replace: true });
      })
      .catch((error) => {
        setWrongPassword("Opps-Wrong password or email--Try again");
        const errorCode = error.code;
        toast.success(`Opps--${errorCode}`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right,#0d0518,#87d0c3, #600e8c)",
          },
        });

        console.log(error);
      });
  };
  const handleGoogleLogin = () => {
    handleGoogleUser()
      .then((result) => {
        toast.success("Google Logged In Successfull", {
          className: "w-[300px] h-[100px] text-xl font-bold",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right, #31c3df, #3a47d5)",
          },
        });
        // navigate(`${logInLocation.state ? logInLocation.state : "/"}`,{replace:true} );
        navigate(`${logInLocation.state?.from || "/"}`, { replace: true });
        console.log(result);
      })
      .then((error) => {
        const errorCode = error.code;
        console.log(error);
        toast.error(`Opps--${errorCode}`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid black",
            color: "white",
            backgroundImage:
              "linear-gradient(to bottom right,#0d0518,#87d0c3, #600e8c)",
          },
        });
      });
  };
  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className=" bg-no-repeat bg-cover bg-top"
    >
      <div className="dynamic-title">
        <Helmet>
          <title>Login</title>
        </Helmet>
      </div>
      <div className="py-24">
        <div className="container mx-auto ">
          <div className="title text-center space-y-2 py-12">
            <h3 className="font-secondary text-light-primary text-center text-sm md:text-xl lg:text-3xl font-bold">Welcome Back</h3>
            <h1 className="text-6xl py-6 font-bold text-light-background">
              Log In your account
            </h1>
            <h5 className="font-secondary text-light-primary text-center text-sm md:text-xl lg:text-3xl font-bold pb-6 md:pb-12">
              Please enter your details to log in.
            </h5>
          </div>
          <div
            className=" card w-full max-w-3xl mx-auto inset-shadow-xl inset-shadow-indigo-500 py-16  backdrop-blur-xl rounded-2xl "
            style={{ boxShadow: "0 0 0px 71f7a130" }}
          >
            <div className="card-body">
              <form
                onSubmit={handleLogin}
                className=" flex flex-col justify-center items-center"
              >
                <label className="w-full text-left label text-2xl text-light-background font-semibold">
                  Email
                </label>
                <br />
                <input
                  name="email"
                  type="email"
                  className="w-full py-6 lg:py-8 text-light-background bg-transparent border-b-2 border-b-cyan-100 focus:outline-none focus:text-light-primary text-xl placeholder:text-light-background"
                  placeholder="Email"
                />
                <br />
                <label className="w-full text-left label text-2xl text-light-background font-semibold">
                  Password
                </label>
                <br />
                <input
                  name="password"
                  type="password"
                  className="w-full py-6 lg:py-8 text-light-background bg-transparent border-b-2 border-b-cyan-100 focus:outline-none focus:text-light-primary text-xl placeholder:text-light-background"
                  placeholder="Password"
                />
                
                
                {/* wrong pass */}
                <div>
                  {wrongPassword && (
                    <h2 className="text-xl text-cyan-300">{wrongPassword}</h2>
                  )}
                </div>{" "}
                *
                <button className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text w-full mt-6">
                  Login
                </button>
              </form>
              {/* social login start */}
              <div className="border-t py-3 mt-5 social-login w-full flex flex-col items-center justify-center">
                <h2 className="border-b w-full text-center border[#fce7f350] pb-5 text-2xl font-bold text-gray-300">
                  Or
                </h2>
                {/* Google */}
                <button
                  onClick={handleGoogleLogin}
                  className="mt-5 w-full mx-auto btn bg-light-background text-light-text border-[#e5e5e5] text-xl p-8 rounded-xl"
                >
                  <svg
                    aria-label="Google logo"
                    width="26"
                    height="26"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
              {/* DONT HAVE ACCOUNT START HERE*/}
              <div className="text-center">
                <h5 className="w-full mx-auto text-2xl text-gray-300">
                  Don't have an account?
                  <Link
                    state={{ from: logInLocation.state?.from || "/" }}
                    to="/register"
                    className="text-light-primary mx-2 font-bold"
                  >
                    Register
                  </Link>
                  Here
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
