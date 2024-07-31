import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import BookingForm from "../../components/BookingForm/BookingForm";
import { url } from "../../ultis/url";

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const [bookingForm, setBookingForm] = useState(false);
  const { hotelId } = useParams();

  useEffect(() => {
    fetch(url + "hotel/detail/" + hotelId)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => console.log(err));
  }, [hotelId]);

  const handleToggleBookingForm = () => {
    setBookingForm(!bookingForm);
  };

  const renderPhotos = () => {
    return detail?.photos.map((photo, index) => {
      return (
        <div
          key={index}
          style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            height: 250,
          }}
        ></div>
      );
    });
  };

  return (
    <>
      <NavBar />
      <div className={`${styles.detail} container`}>
        <div className={styles.info}>
          <h2>{detail?.name}</h2>
          <p className={styles.address}>
            <i className="fa fa-map-marker"></i>
            <span>{detail?.address}</span>
          </p>
          <p className={styles.distance}>
            Excellent location - {detail?.distance}m from center
          </p>
          <p className={styles.price}>
            Book a stay over ${detail?.cheapestPrice} at this property and get a
            free airport taxi
          </p>
          <div className={styles.photos}>{renderPhotos()}</div>
          <button className="btn-primary" onClick={handleToggleBookingForm}>
            Reserve or Book Now!
          </button>
        </div>
        <div className={styles.more}>
          <div className={styles.description}>
            <h2>{detail?.title}</h2>
            <p className={styles.content}>{detail?.desc}</p>
          </div>
          <div className={styles.submit}>
            <h2 className={styles.price}>
              ${detail?.cheapestPrice} <span>(1 night)</span>
            </h2>
            <button className="btn-primary" onClick={handleToggleBookingForm}>
              Reserve or Book Now!
            </button>
          </div>
        </div>
        {detail && bookingForm && <BookingForm hotel={detail} />}
      </div>
      <Form />
      <Footer />
    </>
  );
};

export default Detail;
