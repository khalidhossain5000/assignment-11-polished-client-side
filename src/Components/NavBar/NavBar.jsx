import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../Hooks/userRole";
const NavBar = () => {
  const { user, logOutUser } = useAuth();
  const { role, roleLoading } = useRole();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
    document.querySelector("html").setAttribute("data-theme", savedTheme);
  }, [theme]);
  // theme toggle part ends here
  const handleLogOut = () => {
    logOutUser().then(() => {
      toast.success(`Log Out Successfull`, {
        className: "w-[300px] h-[100px] text-xl font-bold ",
        removeDelay: 1000,
        iconTheme: {
          primary: "#16061e",
          secondary: "#ef54e2",
        },
        style: {
          border: "1px solid black",
          color: "white",
          backgroundImage: "linear-gradient(to bottom right, #31c3df, #3a47d5)",
        },
      });
    });
  };
  // sticky code statd
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    // handler: set sticky if scrolled more than 50px
    const onScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    // use passive listener for better scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });

    // run once to set initial state (if page opened not at top)
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // sticky code ends
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
        >
          All Books
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-books"
              className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
            >
              Add Book{" "}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/borrowed-books/:email"
              className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
            >
              Borrowed Book
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-book-review"
              className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
            >
              Add Book Review
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/all-books-review"
          className="hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text"
        >
          All Books Review
        </NavLink>
      </li>
      {!roleLoading && role === "admin" && (
        <li>
          <NavLink to="/admin-dashboard" className='hover:text-[#01180195] transition duration-300 text-sm md:text-[17px] text-light-text dark:text-dark-text'>Admin Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div
      className={
        `font-secondary shadow-xl fixed top-0 z-50 w-full transition-all duration-300 ease-out ` +
        (isSticky
          ? "bg-[#f9fff990] backdrop-blur-md shadow-sm "
          : "bg-light-background dark:bg-dark-secondary")
      }
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start flex-1  flex justify-between md:justify-start">
          {/* mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="">
            <h3 className="pt-2 md:w-9/12 font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold dark:text-dark-text">
            LibraryCloud
            </h3>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex flex-1 lg:whitespace-nowrap">
          <ul className="flex items-center gap-3 font-bold px-1">{links}</ul>
        </div>

        <div className="navbar-end hidden md:flex flex-1">
          {/* theme toggle start */}
          <label className="swap swap-rotate mr-3">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="dark"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* theme toggle part ends here  */}
          {user ? (
            <>
              <div
                className="tooltip tooltip-bottom md:flex items-center gap-2"
                data-tip={`${user.displayName}`}
              >
                <img
                  className="w-12 h-12 rounded-full cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
                <button
                  onClick={handleLogOut}
                  className="bg-light-primary text-light-text hover:scale-105 hover:shadow-2xl hover:shadow-light-secondary cursor-pointer transition duration-300 rounded-md px-5 py-3 md:px-7 md:py-3 lg:whitespace-nowrap font-secondary font-bold"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <ul className="flex items-center gap-3">
                <li>
                  <NavLink
                    to="/login"
                    className="bg-light-primary text-light-text hover:scale-105 hover:shadow-2xl hover:shadow-light-secondary cursor-pointer transition duration-300 rounded-md px-5 py-3 md:px-7 md:py-3 lg:whitespace-nowrap font-secondary font-bold"
                  >
                    Login{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="bg-light-primary text-light-text hover:scale-110 hover:shadow-2xl hover:shadow-light-secondary cursor-pointer transition duration-300 rounded-md px-5 py-3 md:px-7 md:py-3 lg:whitespace-nowrap font-secondary font-bold"
                  >
                    Register{" "}
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
