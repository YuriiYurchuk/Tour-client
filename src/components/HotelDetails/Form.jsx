import { useState } from "react";
import styles from "./Form.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ModalCalendar from "./Form/ModalCalendar";
import ModalTourist from "./Form/ModalTourist";
import flightData from "./flightData";

const Form = ({
  price,
  roomTypes,
  mealTypes,
  activeMealType,
  setActiveMealType,
  activeRoomType,
  setActiveRoomType,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeFlight, setActiveFlight] = useState(null);

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  const closeDropdown = () => setDropdownOpen(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTouristOpen, setIsTouristOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [selectedTourist, setSelectedTourist] = useState({
    adults: 1,
    children: 0,
    ages: [],
  });

  const handleDateSelect = (dates) => {
    const [startDate, endDate] = dates;
    setSelectedDates({
      startDate,
      endDate,
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  const getRoomPriceText = (price) => {
    if (price > 0) return `+${price} ₴/номер`;
    if (price < 0) return `${price} ₴/номер`;
    return "в ціні";
  };

  const getMealPriceText = (price) => {
    if (price > 0) return `+${price} ₴`;
    if (price < 0) return `${price} ₴`;
    return "в ціні";
  };

  return (
    <>
      <section className={styles["section-form"]}>
        <div className={styles["description-desktop"]}>
          <h2 className={styles["title"]}>Твій відпочинок</h2>
          <p className={styles["price-text"]}>
            <span className={styles["price-amount"]}>{price} ₴</span> / за 1
            людину
          </p>
        </div>
        <form action="">
          <div className={styles["dropdown"]}>
            <p>Дата:</p>
            <button
              type="button"
              className={styles["dropdown-toggle"]}
              onClick={() => setIsCalendarOpen("true")}
            >
              <span>
                {selectedDates.startDate && selectedDates.endDate
                  ? `${formatDate(selectedDates.startDate)} - ${formatDate(
                      selectedDates.endDate
                    )}`
                  : "Обрати дату"}
              </span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className={styles["dropdown"]}>
            <p>Туристи:</p>
            <button
              type="button"
              className={styles["dropdown-toggle"]}
              onClick={() => setIsTouristOpen("true")}
            >
              <span>
                {selectedTourist.adults} + {selectedTourist.children}
              </span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className={styles["dropdown"]}>
            <p>Номер:</p>
            <button
              type="button"
              className={styles["dropdown-toggle"]}
              onClick={() => toggleDropdown("room")}
            >
              <span>
                {roomTypes.find((room) => room.id === activeRoomType)?.name ||
                  "Обрати номер"}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={dropdownOpen === "room" ? styles.rotated : ""}
              />
            </button>
            {dropdownOpen === "room" && (
              <ul className={styles["dropdown-menu"]}>
                {roomTypes.map((room) => (
                  <li key={room.id}>
                    <button
                      type="button"
                      className={styles["dropdown-item"]}
                      onClick={() => {
                        setActiveRoomType(room.id);
                        closeDropdown();
                      }}
                    >
                      <span>{room.name}</span>
                      <span className={styles["item-price"]}>
                        {getRoomPriceText(room.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles["dropdown"]}>
            <p>Харчування:</p>
            <button
              type="button"
              className={styles["dropdown-toggle"]}
              onClick={() => toggleDropdown("meal")}
            >
              <span>
                {mealTypes.find((meal) => meal.id === activeMealType)
                  ?.type_name || "Обрати харчування"}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={dropdownOpen === "meal" ? styles.rotated : ""}
              />
            </button>
            {dropdownOpen === "meal" && (
              <ul className={styles["dropdown-menu"]}>
                {mealTypes.map((meal) => (
                  <li key={meal.id}>
                    <button
                      type="button"
                      className={styles["dropdown-item"]}
                      onClick={() => {
                        setActiveMealType(meal.id);
                        closeDropdown();
                      }}
                    >
                      <span>{meal.type_name}</span>
                      <span className={styles["item-price"]}>
                        {getMealPriceText(meal.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles["dropdown"]}>
            <p>Виліт:</p>
            <button
              type="button"
              className={styles["dropdown-toggle"]}
              onClick={() => toggleDropdown("flight")}
            >
              <span>
                {flightData.find((flight) => flight.id === activeFlight)
                  ? `${
                      flightData.find((flight) => flight.id === activeFlight)
                        ?.name
                    } (${
                      flightData.find((flight) => flight.id === activeFlight)
                        ?.time
                    })`
                  : "Обрати"}
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={dropdownOpen === "flight" ? styles.rotated : ""}
              />
            </button>
            {dropdownOpen === "flight" && (
              <ul className={styles["dropdown-menu"]}>
                {flightData.map((flight) => (
                  <li key={flight.id}>
                    <button
                      type="button"
                      className={styles["dropdown-item-flight"]}
                      onClick={() => {
                        setActiveFlight(flight.id);
                        closeDropdown();
                      }}
                    >
                      <span className="flex justify-between w-full">
                        <span className="flex-1">{flight.name}</span>
                        <span className="text-right">
                          {flight.price && flight.price > 0
                            ? `+ ${flight.price} ₴`
                            : "в ціні"}
                        </span>
                      </span>
                      <span>({flight.time})</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
        <button type="submit" className={styles["submit-btn"]}>
          Відправити за'явку
        </button>
      </section>
      <ModalCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
      />
      <ModalTourist
        isOpen={isTouristOpen}
        onClose={() => setIsTouristOpen(false)}
        onTouristSelect={setSelectedTourist}
      />
    </>
  );
};

Form.propTypes = {
  price: PropTypes.number.isRequired,
  roomTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  mealTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type_name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  activeMealType: PropTypes.string,
  setActiveMealType: PropTypes.func.isRequired,
  activeRoomType: PropTypes.string,
  setActiveRoomType: PropTypes.func.isRequired,
};

export default Form;
