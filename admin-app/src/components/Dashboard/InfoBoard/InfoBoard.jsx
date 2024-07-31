import React from "react";
import classes from "./InfoBoard.module.css";

export default function InfoBoard({ info }) {
  return (
    <div className={classes["info-board"]}>
      <div className={`${classes["info-board-item"]} app-box-shadow`}>
        <div className={classes.title}>Users</div>
        <div className={classes.value}>{info?.userCount}</div>
        <div className={classes.icon}>
          <i style={{ color: "pink" }} className="fa-solid fa-user" />
        </div>
      </div>
      <div className={`${classes["info-board-item"]} app-box-shadow`}>
        <div className={classes.title}>Orders</div>
        <div className={classes.value}>{info?.orderCount}</div>
        <div className={classes.icon}>
          <i
            style={{ color: "orange" }}
            className="fa-solid fa-cart-shopping"
          />
        </div>
      </div>
      <div className={`${classes["info-board-item"]} app-box-shadow`}>
        <div className={classes.title}>Earnings</div>
        <div className={classes.value}>$ {info?.earnings}</div>
        <div className={classes.icon}>
          <i style={{ color: "green" }} className="fa-solid fa-dollar-sign" />
        </div>
      </div>
      <div className={`${classes["info-board-item"]} app-box-shadow`}>
        <div className={classes.title}>Balance</div>
        <div className={classes.value}>$ {info?.balance}</div>
        <div className={classes.icon}>
          <i style={{ color: "purple" }} className="fa-solid fa-credit-card" />
        </div>
      </div>
    </div>
  );
}
