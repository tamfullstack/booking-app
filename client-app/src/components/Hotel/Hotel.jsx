import { useEffect, useState } from "react";
import HotelItem from "./HotelItem";
import { url } from "../../ultis/url";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(url + "hotel/rating")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return [];
      })
      .then((data) => {
        setHotels(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderHotel = () => {
    return hotels.map((hotel, index) => (
      <HotelItem hotel={hotel} key={index} />
    ));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${hotels.length}, 1fr)`,
        gap: 30,
      }}
    >
      {renderHotel()}
    </div>
  );
};

export default Hotel;
