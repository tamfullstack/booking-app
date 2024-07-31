import SearchItem from "./SearchItem";
import { useSelector } from "react-redux";

const SearchList = () => {
  const { searchList } = useSelector((state) => state.search);

  const renderSearchList = () => {
    return (
      searchList &&
      searchList.map((item, index) => <SearchItem item={item} key={index} />)
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${searchList.length}, 1fr)`,
        gap: 20,
      }}
    >
      {renderSearchList()}
    </div>
  );
};

export default SearchList;
