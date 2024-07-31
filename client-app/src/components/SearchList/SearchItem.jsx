import styles from "./SearchItem.module.css";
import { useNavigate } from "react-router-dom";

const SearchItem = (props) => {
  const navigate = useNavigate();

  const handleSeeDetail = (id) => {
    navigate("/detail/" + id);
  };

  return (
    <div className={styles["search-item"]}>
      <div
        style={{
          backgroundImage: `url(${props.item.photos[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></div>
      <div className={styles.content}>
        <h3 className={styles.name}>{props.item.name}</h3>
        <div className={styles.distance}>{props.item.distance} from center</div>
        <div className={styles.description}>{props.item.desc}</div>
        <div className={styles.type}>{props.item.type}</div>
      </div>
      <div className={styles.numbers}>
        <div className={styles.rate}>
          <h4>{props.item.rate_text}</h4>
          <div className="rate-value">{props.item.rating}</div>
        </div>
        <div className={styles.price}>
          <h2>${props.item.cheapestPrice}</h2>
          <p>Includes taxes and fees</p>
          <button
            className="btn-primary"
            onClick={() => {
              handleSeeDetail(props.item._id);
            }}
          >
            <h4>See availability</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
