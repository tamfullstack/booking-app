import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../ultis/formatDate";
import { updateQueryAction, updateResultAction } from "../../store/search";

const Header = () => {
  const { query } = useSelector((state) => state.search);
  const [dateModal, setDateModal] = useState(false);
  const [countModal, setCountModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { destination, startDate, endDate, adults, children, rooms } = query;

  // Chỉnh sửa input

  const handleChangeDestination = (e) => {
    dispatch(updateQueryAction("destination", e.target.value));
  };

  const handleChangeDate = (ranges) => {
    dispatch(updateQueryAction("startDate", ranges.selection.startDate));
    dispatch(updateQueryAction("endDate", ranges.selection.endDate));
  };

  const handleChangeAdults = (e) => {
    dispatch(updateQueryAction("adults", e.target.value));
  };

  const handleChangeChildren = (e) => {
    dispatch(updateQueryAction("children", e.target.value));
  };

  const handleChangeRooms = (e) => {
    dispatch(updateQueryAction("rooms", e.target.value));
  };

  // Đóng mở modal

  const toggleDateModal = () => {
    setDateModal(!dateModal);
  };

  const toggleCountModal = () => {
    setCountModal(!countModal);
  };

  // Giao diện modal

  const renderDateModal = () => {
    return (
      dateModal && (
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          className="date"
          minDate={new Date()}
          onChange={handleChangeDate}
          ranges={[{ startDate, endDate, key: "selection" }]}
        />
      )
    );
  };

  const renderCountModal = () => {
    return (
      countModal && (
        <div className={styles["count-modal"]}>
          <div className={styles["count-modal-input"]}>
            <label htmlFor="adults">Adult</label>
            <input
              id="adults"
              type="number"
              min="1"
              value={adults}
              onChange={handleChangeAdults}
            />
          </div>
          <div className={styles["count-modal-input"]}>
            <label htmlFor="children">Children</label>
            <input
              id="children"
              type="number"
              min="0"
              value={children}
              onChange={handleChangeChildren}
            />
          </div>
          <div className={styles["count-modal-input"]}>
            <label htmlFor="rooms">Room</label>
            <input
              id="rooms"
              type="number"
              min="1"
              value={rooms}
              onChange={handleChangeRooms}
            />
          </div>
        </div>
      )
    );
  };

  // Chuyển trang tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateResultAction(query));
    navigate("/search");
  };

  return (
    <div
      className="bg-dark text-light"
      style={{ position: "relative", zIndex: 1 }}
    >
      <header className={`${styles.header} container`}>
        <h1 className={styles.title}>A life time of discounts? It's Genius.</h1>
        <p className={styles.subtitle}>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        <button className={`btn-primary ${styles.sign}`}>
          Sign in / Register
        </button>
        <form className={styles["search-form"]} onSubmit={handleSearch}>
          <div className={styles.item}>
            <i className="fa fa-bed"></i>
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={handleChangeDestination}
              style={{ border: "none" }}
            />
          </div>
          <div className={styles.item}>
            <div className={styles["item-btn"]} onClick={toggleDateModal}>
              <i className="fa fa-calendar"></i>
              <span>
                {formatDate(startDate)} to {formatDate(endDate)}
              </span>
            </div>
            <div className={styles["item-modal"]}>{renderDateModal()}</div>
          </div>
          <div className={styles.item}>
            <div className={styles["item-btn"]} onClick={toggleCountModal}>
              <i className="fa fa-male"></i>
              <span>
                {adults} adult - {children} children - {rooms} room
              </span>
            </div>
            <div className={styles["item-modal"]}>{renderCountModal()}</div>
          </div>
          <button className="btn-primary">Search</button>
        </form>
      </header>
    </div>
  );
};

export default Header;
