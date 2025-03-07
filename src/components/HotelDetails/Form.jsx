import { useState } from "react";
import styles from "./Form.module.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ModalCalendar from "./Form/ModalCalendar";
import ModalTourist from "./Form/ModalTourist";
import flightData from "./flightData";
import { createBooking } from "@api/bookingApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Form = ({
  price,
  roomTypes,
  mealTypes,
  activeMealType,
  setActiveMealType,
  activeRoomType,
  setActiveRoomType,
  id,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeFlight, setActiveFlight] = useState(null);
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

  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const toggleDropdown = (type) => {
    setDropdownOpen((prev) => (prev === type ? null : type));
  };

  const closeDropdown = () => setDropdownOpen(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!selectedDates.startDate || !selectedDates.endDate) {
        toast.error("Оберіть дати подорожі");
        return;
      }

      if (!activeRoomType) {
        toast.error("Оберіть тип номеру");
        return;
      }

      if (!activeMealType) {
        toast.error("Оберіть тип харчування");
        return;
      }

      if (!activeFlight) {
        toast.error("Оберіть рейс");
        return;
      }

      const airportName = flightData.find(
        (flight) => flight.id === activeFlight
      )?.name;

      const bookingData = {
        user_id: userId,
        hotel_id: id,
        room_type_id: activeRoomType,
        meal_plan_id: activeMealType,
        total_price: totalPrice,
        start_date: selectedDates.startDate,
        end_date: selectedDates.endDate,
        number_of_tourists: selectedTourist.adults,
        number_of_children: selectedTourist.children,
        departure_airport: airportName,
        status: "очікується",
        children: selectedTourist.ages.map((age) => ({ age })),
      };

      const response = await createBooking(bookingData);
      const message = response?.message || response?.data?.message;
      if (message) {
        toast.success(message);
      } else {
        toast.error("Щось пішло не так. Спробуйте ще раз.");
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      const errorMessage =
        statusCode === 400
          ? "Ви вже маєте активне бронювання. Завершіть або скасуйте його перед створенням нового."
          : error?.response?.data?.message ||
            error?.message ||
            "Щось пішло не так. Перевірте ваші дані та спробуйте знову.";

      toast.error(errorMessage);
    }
  };

  const calculateTotalPrice = (
    basePrice,
    selectedDates,
    roomPrice,
    mealPrice,
    flightPrice,
    tourists
  ) => {
    if (!selectedDates.startDate || !selectedDates.endDate) return basePrice;

    const dayInMs = 1000 * 60 * 60 * 24;
    const duration = Math.ceil(
      (selectedDates.endDate - selectedDates.startDate) / dayInMs
    );

    const extraDays = duration - 6;
    const durationMultiplier = extraDays > 0 ? 1 + 0.2 * extraDays : 1;

    const adults = tourists.adults || 1;
    const children = tourists.children || 0;
    const totalPeople = adults + children;

    const totalRoomCost = roomPrice * duration;
    const totalMealCost = mealPrice * duration * totalPeople;
    const totalFlightCost = flightPrice * totalPeople;

    return Math.round(
      (basePrice * durationMultiplier +
        totalRoomCost +
        totalMealCost +
        totalFlightCost) *
        totalPeople
    );
  };

  const totalPrice = calculateTotalPrice(
    price,
    selectedDates,
    roomTypes.find((room) => room.id === activeRoomType)?.price || 0,
    mealTypes.find((meal) => meal.id === activeMealType)?.price || 0,
    flightData.find((flight) => flight.id === activeFlight)?.price || 0,
    selectedTourist
  );

  return (
    <>
      <motion.section
        className={styles["section-form"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
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
        <div className="flex flex-col justify-end items-center">
          <p className={styles["total-price"]}>Разом: {totalPrice} ₴</p>
          <button
            type="submit"
            className={styles["submit-btn"]}
            onClick={handleSubmit}
            disabled={!userId}
          >
            {userId
              ? "Відправити заявку"
              : "Авторизуйтесь для відправлення заявки"}
          </button>
        </div>
      </motion.section>
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
  id: PropTypes.number.isRequired,
};

export default Form;
