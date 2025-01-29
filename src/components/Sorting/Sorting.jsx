import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Sorting.module.scss";

const Sorting = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (value) => {
    const lastIndex = value.lastIndexOf("_");
    const sortBy = value.substring(0, lastIndex);
    const sortOrder = value.substring(lastIndex + 1);

    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy,
      sortOrder,
      page: 1,
    }));
    setIsOpen(false);
  };

  const handleResetSort = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: "",
      sortOrder: "",
      page: 1,
    }));
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const sortValue = `${filters.sortBy}_${filters.sortOrder}`;
    const options = {
      tour_price_desc: "висока ціна",
      tour_price_asc: "низька ціна",
      average_rating_asc: "за рейтингом",
      tour_start_date_asc: "дата з самого раннього",
      tour_start_date_desc: "дата починаючи з останньої",
    };
    return options[sortValue] || "обрати сортування";
  };

  return (
    <div className={styles["sorting-container"]}>
      <button
        className={styles["menu-toggle"]}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={isOpen ? styles.rotated : ""}
          aria-hidden="true"
        />
        <p className={styles["current-value"]}>
          Сортувати:{" "}
          <span className={styles["current-sorting"]}>
            {getCurrentSortLabel()}
          </span>
        </p>
      </button>
      <div
        className={`${styles["sorting-menu"]} ${isOpen ? styles.open : ""}`}
        aria-label="Опції сортування"
      >
        <ul>
          {[
            { value: "tour_price_desc", label: "висока ціна" },
            { value: "tour_price_asc", label: "низька ціна" },
            { value: "average_rating_asc", label: "за рейтингом" },
            { value: "tour_start_date_asc", label: "дата з самого раннього" },
            {
              value: "tour_start_date_desc",
              label: "дата починаючи з останньої",
            },
          ].map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={handleResetSort}>
              скинути сортування
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sorting.propTypes = {
  filters: PropTypes.shape({
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Sorting;
