import React from "react";
import classes from "./Navbar.module.css";
import {
  Link,
  redirect,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { removeToken } from "../../../utils/token";

export default function Navbar() {
  const adminUser = useRouteLoaderData("root");
  const submit = useSubmit();

  const handleLogout = () => {
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    adminUser && (
      <ul className={classes["navbar-lists"]}>
        <li className={classes["navbar-lists-item"]}>
          <div className={classes["navbar-lists-title"]}>Main</div>
          <ul className={classes["navbar-list"]}>
            <li className={classes["navbar-item"]}>
              <Link to="/">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-solid fa-house-chimney-window" />
                </div>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={classes["navbar-lists-item"]}>
          <div className={classes["navbar-lists-title"]}>Lists</div>
          <ul className={classes["navbar-list"]}>
            <li className={classes["navbar-item"]}>
              <Link to="/hotels">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-solid fa-hotel" />
                </div>
                <span>Hotels</span>
              </Link>
            </li>
            <li className={classes["navbar-item"]}>
              <Link to="/rooms">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-regular fa-window-maximize" />
                </div>
                <span>Rooms</span>
              </Link>
            </li>
            <li className={classes["navbar-item"]}>
              <Link to="/transactions">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-solid fa-truck" />
                </div>
                <span>Transactions</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={classes["navbar-lists-item"]}>
          <div className={classes["navbar-lists-title"]}>New</div>
          <ul className={classes["navbar-list"]}>
            <li className={classes["navbar-item"]}>
              <Link to="/new-hotel">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-solid fa-hotel" />
                </div>
                <span>New Hotel</span>
              </Link>
            </li>
            <li className={classes["navbar-item"]}>
              <Link to="/new-room">
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-regular fa-window-maximize" />
                </div>
                <span>New Room</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={classes["navbar-lists-item"]}>
          <div className={classes["navbar-lists-title"]}>User</div>
          <ul className={classes["navbar-list"]} onClick={handleLogout}>
            <li className={classes["navbar-item"]}>
              <div className={classes["logout-btn"]}>
                <div className={classes["navbar-item-icon"]}>
                  <i className="fa-solid fa-right-from-bracket" />
                </div>
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    )
  );
}

export const logoutAction = () => {
  removeToken();
  return redirect("/login");
};
