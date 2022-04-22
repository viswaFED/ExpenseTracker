import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const history = useHistory();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setSwap] = useState(false);
  const swapHandler = (event) => {
    event.preventDefault();
    setSwap((preValue) => !preValue);
  };

  const SignupBtnHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (isLogin) {
      if (
        inputPasswordRef.current.value.trim().length > 5 &&
        inputEmailRef.current.value.includes("@") &&
        inputEmailRef.current.value.includes(".com")
      ) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("User has successfully Loged in.");
            localStorage.setItem("Token", data.idToken);
            localStorage.setItem("userID", data.localId);
            inputEmailRef.current.value = "";
            inputPasswordRef.current.value = "";
            history.replace("/home");
          } else {
            const data = await response.json();
            alert(data.error.message);
          }
        } catch (err) {
          console("Loging Something went wrong!");
        }
      } 
    }
    else if (!isLogin) {
      if (
        inputPasswordRef.current.value === confirmPasswordRef.current.value &&
        inputPasswordRef.current.value.trim().length > 5 &&
        inputEmailRef.current.value.includes("@") &&
        inputEmailRef.current.value.includes(".com")
      ) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
            {
              method: "POST",
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
            )

          if (response.ok) {
            console.log("User has successfully signed up.");
            inputEmailRef.current.value = "";
            inputPasswordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            setSwap(true);
          } else {
            const data = await response.json();
            alert(data.error.message);
          }
        } catch (err) {
          console.log("Something went wrong");
          console.log(err);
        }
      } else {
        alert("Please enter field properly");
      }
    } 
  };

  return (
    <>
      <div className="signup">
        <h1>{isLogin ? "Login" : "SignUp"}</h1>
        <form>
          <div className="inputitems">
            <input
              type="email"
              htmlFor="email"
              className="input"
              placeholder="Email"
              ref={inputEmailRef}
              required
            />
          </div>
          <div className="inputitems">
            <input
              type="password"
              minLength="6"
              className="input"
              ref={inputPasswordRef}
              maxLength="16"
              placeholder="Password"
              required
            />
          </div>
          {!isLogin && (
            <div className="inputitems">
              <input
                type="password"
                ref={confirmPasswordRef}
                className="input"
                maxLength="16"
                placeholder="Confirm Password"
                minLength="6"
                required
              />
            </div>
          )}
          <div>
            <button onClick={SignupBtnHandler} className="btn">
              {isLogin ? "Login" : "SignUp"}
            </button>
            {isLogin && (
              <label className="forgotpassword" > <Link to='/forgotpassword'>Forgot password</Link></label>
            )}
          </div>
        </form>
      </div>
      <div className="msgbox">
        <button onClick={swapHandler}>
          {isLogin
            ? "Don't have an account? Sign up"
            : "Have an account? Login"}
        </button>
      </div>
    </>
   
  );
};

export default Signup;
