import { url } from "../../ultis/url";

const CityItem = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url + props.city.image})`,
        backgroundSize: "cover",
        height: 300,
        backgroundPosition: "50% 50%",
        borderRadius: 20,
        position: "relative",
      }}
    >
      <div
        style={{ position: "absolute", left: 20, bottom: 20, color: "#fff" }}
      >
        <h1>{props.city.name}</h1>
        <h2>{props.city.subText}</h2>
      </div>
    </div>
  );
};

export default CityItem;
