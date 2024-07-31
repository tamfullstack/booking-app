import styles from "./SearchPopup.module.css";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../ultis/formatDate";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { updateQueryAction, updateResultAction } from "../../store/search";

const SearchPopup = () => {
  const { query } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [dateModal, setDateModal] = useState(false);

  const { destination, startDate, endDate, adults, children, rooms } = query;

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

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateResultAction(query));
  };

  const toggleDateModal = () => {
    setDateModal(!dateModal);
  };

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

  return (
    <div className={styles["search-popup"]}>
      <h3>Search</h3>
      <form className={styles["search-form"]} onSubmit={handleSearch}>
        <h5>Destination</h5>
        <input
          className={styles["input-destination"]}
          type="text"
          value={destination}
          onChange={handleChangeDestination}
        />
        <h5>Check-in-date</h5>
        <div className={styles["input-check-in-date"]}>
          <div className={styles.button} onClick={toggleDateModal}>
            {`${formatDate(startDate)} to ${formatDate(endDate)}`}
          </div>
          <div className={styles.modal}>{renderDateModal()}</div>
        </div>
        <h5>Option</h5>
        <div className={styles.option}>
          <div className={styles.item}>
            <label className={styles.label}>
              Min price <span>per night</span>
            </label>
            <input className={styles.input} type="text" />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>
              Max price <span>per night</span>
            </label>
            <input className={styles.input} type="text" />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Adult</label>
            <input
              className={styles.input}
              type="number"
              min="1"
              value={adults}
              onChange={handleChangeAdults}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Children</label>
            <input
              className={styles.input}
              type="number"
              min="0"
              value={children}
              onChange={handleChangeChildren}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Room</label>
            <input
              className={styles.input}
              type="number"
              min="1"
              value={rooms}
              onChange={handleChangeRooms}
            />
          </div>
        </div>
        <button className={`${styles["search-submit"]} btn-primary`}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPopup;
