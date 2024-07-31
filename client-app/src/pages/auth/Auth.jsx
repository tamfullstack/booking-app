import React, { useEffect, useRef, useState } from "react";
import styles from "./Auth.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import { setToken, getToken } from "../../ultis/token";
import { url } from "../../ultis/url";

export default function Auth() {
  const { search } = useLocation();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const mode = searchParams.get("mode");
  const token = getToken();

  useEffect(() => {
    if (token || (mode !== "login" && mode !== "register")) {
      navigate("/");
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    setError("");
  }, [token, mode, navigate]);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setError("");

    try {
      let authUrl = url + "auth/";

      if (isLogin) {
        authUrl += "login";
      } else {
        authUrl += "signup";
      }

      const res = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.status === 201) {
        setToken(data.token);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className={styles["auth-error"]}>{error}</div>
        <form className={styles["auth-form"]} onSubmit={handleSubmit}>
          <input
            className={styles["auth-form-input"]}
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className={styles["auth-form-input"]}
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button className={`btn-primary ${styles["auth-form-btn"]}`}>
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
      <Form />
      <Footer />
    </>
  );
}
