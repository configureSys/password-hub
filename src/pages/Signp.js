import React, { useState } from "react";
import "../Stylesheets/loginsignup.css";
import {useNavigate} from "react-router-dom"

const Signp = () => {
  const [signupValues, setSigupValues] = useState({
    fullname: "",
    email: "",
    dob: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });
  const [showPass,setShowPass]=useState(false)
  const [showConPass,setShowConPass]=useState(false)
  const navigate=useNavigate()
  const inputHandler = (e) => {
    setSigupValues({ ...signupValues, [e.target.name]: e.target.value });
  };

  async function signup(e) {
    e.preventDefault();
    const { email, password, fullname, dob, phone } = signupValues;

    const url="http://localhost:3001"
    const response = await fetch(`${url}/auth/api/createuser`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        name:fullname,
        email,
        password,
        fullname,
        dob,
        phone,
      },)
    });
    const data = await response.json();
    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("authToken", data.message);
      navigate("/")
    }
  }

  return (
    <div className="signupBody">
      <div className="wrapper">
        <div className="form-box register">
          <h2>Sign Up</h2>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div className="inputRegister">
              <input
                type="text"
                name="fullname"
                value={signupValues.fullname}
                onChange={inputHandler}
                placeholder="Name"
              />
            </div>
            <div className="inputRegister">
              <input
                type="email"
                name="email"
                value={signupValues.email}
                onChange={inputHandler}
                placeholder="Email"
              />
            </div>
            <div className="inputRegister">
              <input
                type="date"
                name="dob"
                value={signupValues.dob}
                onChange={inputHandler}
                placeholder="DOB"
              />
            </div>
            <div className="inputRegister">
              <input
                type="text"
                name="phone"
                value={signupValues.phone}
                onChange={inputHandler}
                placeholder="Phone"
              />
            </div>
            <div className="inputRegister">
              <input
                type={`${showPass?"text":"password"}`}
                name="password"
                value={signupValues.password}
                onChange={inputHandler}
                placeholder="Password"
              />
              <button className="eyeBtn"  onClick={()=>setShowPass(prev=>!prev)}>
                <i className={`fa-solid fa-eye${showPass?"":"-slash"}`}></i>
              </button>
            </div>
            <div className="inputRegister">
              <input
                type={`${showConPass?"text":"password"}`}
                name="confirmpassword"
                value={signupValues.confirmpassword}
                onChange={inputHandler}
                placeholder="Confirm Password"
              />
              <button className="eyeBtn" onClick={()=>setShowConPass(prev=>!prev)}>
                <i className={`fa-solid fa-eye${showConPass?"":"-slash"}`}></i>
              </button>
            </div>
            <button type="submit" className="btn" onClick={signup}>
              SignUp
            </button>
            <div className="register-login">
              <p>
                Already have an account ?{" "}
                <a href="signin" className="register-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signp;
