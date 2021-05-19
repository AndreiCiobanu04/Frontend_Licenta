import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { isUserLoggedIn, logout } from "./services/LoginService";
import userEvent from "@testing-library/user-event";
import isProfessor from "./pages/AccountInfo";

const Header = ({ activeUser, setActiveUser }) => {
  function logout() {
    sessionStorage.removeItem("authenticatedUser");
    setActiveUser({ id: "" });
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        {isUserLoggedIn() && (
          <div>
            <a className="navbar-brand">{activeUser.username}</a>
          </div>
        )}
        <ul className="navbar-nav">
          {isUserLoggedIn() && (
            <li>
              <Link className="nav-link" to="/welcome">
                Homepage
              </Link>
            </li>
          )}
          {isUserLoggedIn() && activeUser.typeOfUser === "professor" && (
            <li>
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
          )}
          {isUserLoggedIn() &&
            activeUser.typeOfUser === "student" &&
            !activeUser.projectId && (
              <li>
                <Link className="nav-link" to="/availableProjects">
                  Available Projects
                </Link>
              </li>
            )}
          {isUserLoggedIn() && (
            <li>
              <Link className="nav-link" to="/accountInfo">
                Account Information
              </Link>
            </li>
          )}
          {isUserLoggedIn() &&
            activeUser.typeOfUser === "student" &&
            !activeUser.projectId && (
              <li>
                <Link className="nav-link" to="/studentRequests">
                  Requests
                </Link>
              </li>
            )}
          {isUserLoggedIn() && activeUser.typeOfUser === "student" && (
            <li>
              <Link className="nav-link" to="/skillAssesment">
                Skills Assesment
              </Link>
            </li>
          )}
          {isUserLoggedIn() &&
            activeUser.typeOfUser === "student" &&
            activeUser.projectId && (
              <li>
                <Link className="nav-link" to="/assignedProject">
                  AssignedProject
                </Link>
              </li>
            )}
        </ul>
        <ul className="navbar nav navbar-collapse justify-content-end">
          {!isUserLoggedIn() && (
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
          {isUserLoggedIn() && (
            <li>
              <Link className="nav-link" to="/logout" onClick={logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
