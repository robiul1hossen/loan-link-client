import React, { use } from "react";
import { FaRegMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <NavLink to="/">
        <li className="font-semibold mx-3">Home</li>
      </NavLink>
      <NavLink to="/all-loans">
        <li className="font-semibold mx-3">All Loans</li>
      </NavLink>
      <NavLink to="/about">
        <li className="font-semibold mx-3">About Us</li>
      </NavLink>
      <NavLink to="/contact">
        <li className="font-semibold mx-3">Contact</li>
      </NavLink>
      {user && (
        <NavLink to="/dashboard">
          <li className="font-semibold mx-3">Dashboard</li>
        </NavLink>
      )}
      {user ? (
        <>
          <img
            src={user?.photoURL}
            alt=""
            className="w-10 h-10 rounded-full"
            referrerPolicy="no-referrer"
          />
          <NavLink onClick={handleLogout} to="">
            <li className="font-semibold mx-3">Logout</li>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/auth/login">
            <li className="font-semibold mx-3">Login</li>
          </NavLink>
          <NavLink to="/auth/register">
            <li className="font-semibold mx-3">Register</li>
          </NavLink>
        </>
      )}
      {/* //TODO toggle theme */}
      <li className="font-semibold mx-3">
        <FaRegMoon size={24} />
      </li>
    </>
  );
  return (
    <div className="sticky top-0 z-50 mb-5 max-w-6xl mx-auto">
      <div className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
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
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <Link to="/" className="font-bold text-xl">
            LOANLINK
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
