import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";
import ExpenseContext from "../../Store/Context-Provider";

const Header = () => {
  const history = useHistory();
  const conCtx = useContext(ExpenseContext);
  const isLoggedIn = conCtx.isLoggedIn;

  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("Token", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");
    conCtx.login(false);
    history.replace("/login");
  };
  return (
    <header className={classes.header}>
      <NavLink to="/home">
        <div className={classes.logo}>Expense Tracker</div>
      </NavLink>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button>
                <Link to="/add-exp">Add Expense</Link>
              </button>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button>
                <Link to="/profile">Update Profile</Link>
              </button>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
