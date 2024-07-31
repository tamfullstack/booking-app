import City from "../../components/City/City";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import Hotel from "../../components/Hotel/Hotel";
import NavBar from "../../components/NavBar/NavBar";
import Type from "../../components/Type/Type";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <NavBar />
      <Header />
      <div className="container">
        <div className={styles["homepage-list"]}>
          <City />
          <h3 className={styles.title}>Browse by property type</h3>
          <Type />
          <h3 className={styles.title}>Homes guests love</h3>
          <Hotel />
        </div>
      </div>
      <Form />
      <Footer />
    </>
  );
};

export default Home;
