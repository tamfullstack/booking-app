import React from "react";
import classes from "./Login.module.css";
import { Form, redirect, useActionData } from "react-router-dom";
import { url } from "../../utils/url";
import { setToken } from "../../utils/token";

export default function Login() {
  const error = useActionData();

  return (
    <div className={classes.login}>
      <h2>Login</h2>
      {error && <p className={classes["login-error"]}>{error}</p>}
      <Form method="post" className={classes["login-form"]}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className="app-btn">Login</button>
      </Form>
    </div>
  );
}

export const loginAction = async ({ request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await fetch(url + "auth", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const resData = await res.json();

    if (res.status === 201) {
      setToken(resData.token);
      return redirect("/");
    }

    throw new Error(resData.message);
  } catch (error) {
    return error.message;
  }
};
