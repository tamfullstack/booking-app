import { useEffect, useState } from "react";
import TypeItem from "./TypeItem";
import { url } from "../../ultis/url";

const Type = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(url + "hotel/types")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return [];
      })
      .then((data) => {
        const fetchedTypes = [
          {
            name: "Hotels",
            count: data.find((item) => item.name === "hotel").count,
            image: "./images/type_1.webp",
          },
          {
            name: "Apartments",
            count: data.find((item) => item.name === "apartment").count,
            image: "./images/type_2.jpg",
          },
          {
            name: "Resorts",
            count: data.find((item) => item.name === "resort").count,
            image: "./images/type_3.jpg",
          },
          {
            name: "Villas",
            count: data.find((item) => item.name === "villa").count,
            image: "./images/type_4.jpg",
          },
          {
            name: "Cabins",
            count: data.find((item) => item.name === "cabin").count,
            image: "./images/type_5.jpg",
          },
        ];
        setTypes(fetchedTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderType = () => {
    return types.map((type, index) => <TypeItem type={type} key={index} />);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${types.length}, 1fr)`,
        gap: 20,
      }}
    >
      {renderType()}
    </div>
  );
};

export default Type;
