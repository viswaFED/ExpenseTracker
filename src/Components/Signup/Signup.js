import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
   const history = useHistory();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [islogin, setIsLogin] = useState(true);
  const [isloading, setIsLoding] = useState(false);
  const SwitchAuthModeHandler = () => [setIsLogin((prevState) => !prevState)];

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    if (enteredPassword !== confirmPasswordRef.current.value) {
      alert("password doesnot match with confirm enter correct password");
      return;
    }
    setIsLoding(true);
    let url;
    if (islogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          console.log(data.data);
           history.replace("/home");
        })
        .catch((err) => {
          alert("Authentical failed");
        });
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI";
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
            setIsLoding(false);
            if (res.ok) {
              console.log("Successfully Registered");
              alert("Successfully Registered");
    
              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data.error.message);
                alert(data.error.message);
              });
            }
          })
          .then((data) => {
            console.log(data);
            // history.replace("/");
          })
          .catch((err) => {
            alert(err.message);
          });
    }
  };

  return (
    <>
      <div className="signup">
        <h2>{islogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={submitHandler}>
          <div className="inputitems">
            <input
              className="input"
              type="email "
              placeholder="Email"
              id="email"
              ref={inputEmailRef}
            />
          </div>
          <div className="inputitems">
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              ref={inputPasswordRef}
            />
          </div>
          <div className="inputitems">
            <input
              className="input"
              type="confirm-password"
              placeholder="Confirm Password"
              id="confirm-password"
              ref={confirmPasswordRef}
            />
          </div>
          <div>
            {!isloading && (
              <button className="btn">
               {islogin ? "Login" : "Create Account"}
              </button>
            )}
            {isloading && <p>Loading..</p>}
          </div>
        </form>
      </div>
      <div className="msgbox">
        <button onClick={SwitchAuthModeHandler}>
          {islogin ? "Don't Have an Account ? Signup" : " Have an Account? Login"}
        </button>
      </div>
    </>
  );
};

export default Signup;
