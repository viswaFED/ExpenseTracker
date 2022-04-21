import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("Token", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    history.replace("/login");
  };
  return (
    <header className={classes.header}>
      <NavLink to="/home">
        <div className={classes.logo}>Expense Tracker</div>
      </NavLink>
      <nav>
        <ul>
          <li>
            <button>
              <NavLink to="/login">Login</NavLink>
            </button>
          </li>

          <li>
            <button>
              <NavLink to="/add-exp">Add Expense</NavLink>
            </button>
          </li>

          <li>
            <button>
              <NavLink to="/profile">Update Profile</NavLink>
            </button>
          </li>

          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
