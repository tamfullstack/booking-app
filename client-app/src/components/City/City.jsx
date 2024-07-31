import { useEffect, useState } from "react";
import CityItem from "./CityItem";
import { url } from "../../ultis/url";

const City = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(url + "hotel/cities")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return [];
      })
      .then((data) => {
        setCities(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderCity = () => {
    return cities.map((city, index) => <CityItem city={city} key={index} />);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cities.length}, 1fr)`,
        gap: 40,
      }}
    >
      {renderCity()}
    </div>
  );
};

export default City;
