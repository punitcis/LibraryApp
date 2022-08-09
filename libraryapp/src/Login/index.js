import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handlelogin = async () => {
    let result = await fetch("http://localhost:4500/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    <>
      <div className={styles.authWrapper}>
        <div className={styles.authInner}>
          <form>
            <h3 className="login">Login</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className={styles.formControl}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className={styles.formControl}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button
                onClick={handlelogin}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
