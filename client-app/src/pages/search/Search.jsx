import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import NavBar from "../../components/NavBar/NavBar";
import SearchList from "../../components/SearchList/SearchList";
import SearchPopup from "../../components/SearchPopup/SearchPopup";

const Search = () => {
  return (
    <>
      <NavBar />
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: 20,
          margin: "60px auto",
        }}
      >
        <div>
          <SearchPopup />
        </div>
        <div>
          <SearchList />
        </div>
      </div>
      <Form />
      <Footer />
    </>
  );
};

export default Search;
