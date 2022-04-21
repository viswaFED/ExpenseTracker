import React,{ Fragment } from "react";
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
//import Header from "./Components/NavBar/Header";
// import { Fragment } from "react";
import Signup from "./Components/Signup/Signup";
import Layout from "./Components/NavBar/Layout";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/ProfilePage";
import Expense from "./Pages/ExpensePage";

function App() {
  return (
    <Fragment>
      <Switch>
        <Layout />
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <Signup />
        </Route>
        <Route path="/add-exp" exact>
          <Expense />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
