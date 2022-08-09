import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const options = [
  {
    label: "Select",
    value: "Select",
  },
  {
    label: "Creator",
    value: "creator",
  },
  {
    label: "Visitor",
    value: "visitor",
  },
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  });

  const signUp = async () => {
    let result = await fetch("http://localhost:4500/register", {
      method: "post",
      body: JSON.stringify({ email, password, role }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/login");
  };

  return (
    <>
      <div className={styles.authWrapper}>
        <div className={styles.authInner}>
          <form>
            <h3>Sign Up</h3>
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
              <label>Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid">
              <button
                type="button"
                onClick={signUp}
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
            <p className={styles.forgotPassword}>
              Already registered <a href="/login">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
