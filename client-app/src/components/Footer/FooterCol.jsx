import styles from "./FooterCol.module.css";

const FooterCol = (props) => {
  const renderFooterCol = () => {
    return props.col.col_values.map((value, index) => {
      return (
        <li className={styles["footer-col-item"]} key={index}>
          <a href="/">{value}</a>
        </li>
      );
    });
  };

  return <ul className={styles["footer-col"]}>{renderFooterCol()}</ul>;
};

export default FooterCol;
