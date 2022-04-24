import React, { useRef, useEffect, useContext } from "react";
import ExpenseContext from "../../Store/Context-Provider";
import "./ProfileForm.css";

const ProfileForm = () => {
  const nameInputRef = useRef();
  const photoUrlRef = useRef();
  const conCtx = useContext(ExpenseContext);

  const autogetData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: conCtx.token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        data.users.forEach((element) => {
          console.log(data.users);
          nameInputRef.current.value = element.displayName;
          photoUrlRef.current.value = element.photoUrl;
        });
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (err) {
      console.log("Auto fetch error!");
    }
  };

  useEffect(() => {
    autogetData();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();
    const entertedName = nameInputRef.current.value;
    const entertedPhotoUrl = photoUrlRef.current.value;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA_u3j-_CtI_i8U5vWkP9qADXUZaJIU1AI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: conCtx.token,
            displayName: entertedName,
            photoUrl: entertedPhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log("Updated success");
        nameInputRef.current.value = "";
        photoUrlRef.current.value = "";
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (err) {
      console("Updating went wrong!");
    }
  };
  return (
    <div className="profileupdate">
      <h2>Contact Details</h2>
      <form>
        <div className="profiledetails">
          <label>Full Name</label>
          <input type="text" ref={nameInputRef} required />
        </div>
        <div className="profiledetails">
          <label>Photo url</label>
          <input type="text" ref={photoUrlRef} required />
        </div>
        <div className="btn">
          <button onClick={updateHandler} className="updatebtn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileForm;
