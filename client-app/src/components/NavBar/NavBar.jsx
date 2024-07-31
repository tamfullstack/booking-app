import NavBarItem from "./NavBarItem";
import styles from "./NavBar.module.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "../../ultis/token";
import { updateUserAction } from "../../store/user";

const NavBar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserAction());
  }, [dispatch]);

  const handleAuth = (mode) => {
    navigate("/auth?mode=" + mode);
  };

  const handleBrowseTransactions = () => {
    navigate("/transactions");
  };

  const handleLogout = () => {
    removeToken();
    dispatch(updateUserAction());
  };

  const renderUser = () => {
    if (user) {
      return (
        <div className={styles.btn}>
          <span>{user.email}</span>
          <button onClick={handleBrowseTransactions}>Transactions</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    }

    return (
      <div className={styles.btn}>
        <button
          onClick={() => {
            handleAuth("register");
          }}
        >
          Register
        </button>
        <button
          onClick={() => {
            handleAuth("login");
          }}
        >
          Login
        </button>
      </div>
    );
  };

  const renderNavBar = () => {
    const navBar = [
      {
        type: "Stays",
        icon: "fa-bed",
        active: true,
      },
      {
        type: "Flights",
        icon: "fa-plane",
        active: false,
      },
      {
        type: "Car rentals",
        icon: "fa-car",
        active: false,
      },
      {
        type: "Attractions",
        icon: "fa-bed",
        active: false,
      },
      {
        type: "Airport taxis",
        icon: "fa-taxi",
        active: false,
      },
    ];

    return navBar.map((item, index) => <NavBarItem item={item} key={index} />);
  };

  return (
    <div className="bg-dark text-light">
      <nav className={`${styles["nav-bar"]} container`}>
        <div className={styles["nav-bar-header"]}>
          <Link to="/" className={styles.title}>
            Booking Website
          </Link>
          {renderUser()}
        </div>
        <ul className={styles["nav-bar-list"]}>{renderNavBar()}</ul>
      </nav>
    </div>
  );
};

export default NavBar;
