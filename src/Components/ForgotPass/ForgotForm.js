import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const ForgotForm = () => {
  const [isLoading, setLoading] = useState(false);
  const inputEmailRef = useRef();
  const history = useHistory();
  const resetButtonhandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;

    setLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(`Link successfully send to ${enteredEmail}`);
        history.replace("/login");
      } else {
        const data = await response.json();
        alert(data.error.message);
      }
      setLoading(false);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
      setLoading(false);
    }
  };
  const gotoHandler = (event) => {
    event.preventDefault();
    history.replace("/login");
  };

  return (
    <>
      <div className="signup">
        <h1>Rest Password</h1>
        <form>
          <div className="inputitems"> Enter Your Registered Mail Id </div>
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
          <div>
            <button className="btn" onClick={resetButtonhandler}>
              {isLoading ? "Sending..." : "Send Link"}
            </button>
          </div>
        </form>
      </div>
      <div className="msgbox">
        <label>
          Know your Password?
          <span className="downspan" onClick={gotoHandler}>
            login
          </span>
        </label>
      </div>
    </>
  );
};

export default ForgotForm;
