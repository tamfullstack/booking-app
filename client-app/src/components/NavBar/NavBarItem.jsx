import styles from "./NavBarItem.module.css";

const NavBarItem = (props) => {
  return (
    <li
      className={`${styles["nav-bar-item"]} ${
        props.item.active ? styles.active : ""
      }`}
    >
      <a href="/">
        <i className={`fa ${props.item.icon}`}></i>
        <p>{props.item.type}</p>
      </a>
    </li>
  );
};

export default NavBarItem;
