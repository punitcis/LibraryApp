import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  let auth = localStorage.getItem("user");
  let navbar = JSON.parse(auth);
  console.log(auth, "auth===========");
  return (
    <>
      {auth ? (
        <>
          {navbar.role === "visitor" ? (
            <ul className="nav-ul">
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                {navbar.role === "visitor" ? (
                  <Link to="/ViewbookUser">View Book</Link>
                ) : (
                  <Link to="/Viewbook">View Book</Link>
                )}
              </li>
              <li>
                <Link onClick={logout} to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav-ul">
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/Addbook">Add Book</Link>
              </li>
              <li>
                <Link to="/Viewbook">View Book</Link>
              </li>
              <li>
                <Link onClick={logout} to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Nav;
