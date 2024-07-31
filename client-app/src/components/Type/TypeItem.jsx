const TypeItem = (props) => {
  return (
    <div className="type-item">
      <div
        style={{
          backgroundImage: `url(${props.type.image})`,
          backgroundSize: "cover",
          height: 150,
          backgroundPosition: "50% 50%",
          marginBottom: 10,
          borderRadius: 10,
        }}
      ></div>
      <h4>{props.type.name}</h4>
      <p>{props.type.count} hotels</p>
    </div>
  );
};

export default TypeItem;
