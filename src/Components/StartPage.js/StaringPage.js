import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const [checkVerified, setverified] = useState(false);

  const autoVerifyEmailCheck = async () => {
    const token = localStorage.getItem("Token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            oobCode: "User Verified. Thank you!!",
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data.emailVerified);
        console.log("Send success");
        if (data.emailVerified) {
          setverified(true);
        }
      }
    } catch (err) {
      console.log(`Error = ${err}`);
    }
  };

  useEffect(() => {
    autoVerifyEmailCheck();
  }, []);

  const verifyHandler = async () => {
    const token = localStorage.getItem("Token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            requestType: "VERIFY_EMAIL",
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        console.log("Send success");
      }
    } catch (err) {
      console.log(`Error = ${err}`);
    }
  };
  return (
    <section className={classes.starting}>
      <h1> Welcome to Expense Tracker</h1>
      <div>
        <h4>
          Your Profile is incomplete please
          <Link to="/profile"> update Your Profile</Link>
        </h4>
      </div>
      <div>
      {!checkVerified && (
        <h4> Please Verify Your MailID</h4>)}
        {!checkVerified && (
          <button onClick={verifyHandler} className={classes.verifybtn}>
            Verify Email
          </button>
        )}
      </div>
    </section>
  );
};

export default StartingPageContent;
