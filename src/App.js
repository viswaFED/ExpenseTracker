import React,{ Fragment, useContext } from "react";
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
//import Header from "./Components/NavBar/Header";
// import { Fragment } from "react";
import Signup from "./Components/Signup/Signup";
import Layout from "./Components/NavBar/Layout";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/ProfilePage";
// import Expense from "./Pages/ExpensePage";
import Forgot from "./Pages/ForgotPasswordPage";
import ExpenseContext from "./Store/Context-Provider";
import ExpenseForm from "./Components/Expenses/ExpensesForm";

function App() {
   const conCtx= useContext(ExpenseContext);
  

  return (
    <Fragment>
      <Switch>
        <Layout />
       {conCtx.isLoggedIn && <Route path="/home">
          <HomePage />
        </Route>}
        {!conCtx.isLoggedIn && <Route path="/login" exact>
          <Signup />
        </Route>}
        {conCtx.isLoggedIn && <Route path="/add-exp" exact>
          <ExpenseForm/>
        </Route>}
        {conCtx.isLoggedIn &&  <Route path="/profile">
          <Profile />
        </Route> }
        <Route path="/forgotpassword">
          <Forgot />
        </Route>
        
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
