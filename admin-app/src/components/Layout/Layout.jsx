import React from "react";
import classes from "./Layout.module.css";
import Navbar from "./Navbar/Navbar";
import { url } from "../../utils/url";
import { getToken } from "../../utils/token";

export default function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <div className={classes.title}>
        <h3>Admin Page</h3>
      </div>
      <div></div>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export const adminUserLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const res = await fetch(url + "auth", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
