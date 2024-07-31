import styles from "./HotelItem.module.css";

const HotelItem = (props) => {
  return (
    <div className={styles["hotel-item"]}>
      <div
        style={{
          backgroundImage: `url(${props.hotel.photos[0]})`,
          backgroundSize: "cover",
          height: 300,
          backgroundPosition: "50% 50%",
        }}
      ></div>
      <h4 className={styles.name}>{props.hotel.name}</h4>
      <h4 className={styles.city}>{props.hotel.city}</h4>
      <h4
        className={styles.price}
      >{`Starting from $${props.hotel.cheapestPrice}`}</h4>
      <p className={styles.type}>
        <span className="rate-value" style={{ marginRight: 10 }}>
          {props.hotel.rating}
        </span>
        {props.hotel.type}
      </p>
    </div>
  );
};

export default HotelItem;
