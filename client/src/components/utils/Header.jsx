import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useHistory } from "react-router-dom";

function Header({ jwt, setToken }) {
  console.log(jwt, "=> header");
  const handleLogOut = async (e) => {
    try {
      let result = await axios.get("/auth/logout");
      if (result) {
        setToken("");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfile = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BLOG
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="blogs">
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createblog">
                create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                about
              </Link>
            </li>
            {jwt ? (
              <div className="d-flex justify-content-center mx-2">
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-primary mx-2"
                    onClick={handleLogOut}
                  >
                    logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link
                    to="/user"
                    className="nav-link btn btn-primary mx-2"
                    onClick={handleProfile}
                  >
                    See Profile
                  </Link>
                </li>
              </div>
            ) : (
              <div className="d-flex justify-content-center mx-2">
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-primary mx-2"
                    to="/register"
                  >
                    register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary mx-2" to="/login">
                    login
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

/**
 * ?//navbar
 *
 * ?//navbar
 */
