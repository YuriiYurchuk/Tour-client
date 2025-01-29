import PropTypes from "prop-types";
import styles from "./HotelCard.module.scss";
import hot from "../../assets/images/hot-icon.svg";
import star from "../../assets/images/filled-star-icon.svg";
import calendar from "../../assets/images/calendar-icon.svg";
import food from "../../assets/images/food-icon.svg";
import { formatMonthDayYear, formatMonthDay } from "@utils/formatDate";
import Button from "@components/UI/Button/Button";
import { useNavigate } from "react-router-dom";

const HotelCard = ({
  id,
  name,
  city,
  country,
  starRating,
  averageRating,
  reviewCount,
  isHotDeal,
  tourPrice,
  tourStartDate,
  tourEndDate,
  includedMealTypes,
  season,
  amenities,
  hotelPhoto,
}) => {
  const stars = Array(starRating).fill(true);

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    const formattedName = name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/tour-selection/${id}/${formattedName}`);
  };

  return (
    <article className={styles["container-card"]}>
      <section className={styles["section-img"]}>
        <img className={styles["card-img"]} src={hotelPhoto} alt={name} />
        <p className={styles["season-img"]}>{season}</p>
        {isHotDeal && (
          <div className={styles["hot-deal-icon"]}>
            <img src={hot} alt="Гаряча пропозиція" />
          </div>
        )}
      </section>
      <section className={styles["section-content"]}>
        <div>
          <h4>
            {country}, {city}
          </h4>
          <p className={styles["hotel-name"]}>{name}</p>
          <div className={styles["star-rating"]}>
            {stars.map((_, index) => (
              <img
                key={`star-${index + 1}`}
                src={star}
                alt="Star"
                className={styles["star-icon"]}
              />
            ))}
          </div>
          <p className={styles["hotel-review-rating"]}>
            <span className={styles["rating"]}>{averageRating}</span>{" "}
            {reviewCount} відгуків
          </p>
        </div>
        <div className={styles["info"]}>
          <div>
            <div className={styles["date-info"]}>
              <img src={calendar} alt="Calendar icon" />
              <p>
                {formatMonthDay(tourStartDate)} -{" "}
                {formatMonthDayYear(tourEndDate)}
              </p>
            </div>
            <div className={styles["meal-info"]}>
              <img src={food} alt="Food icon" />
              <p>{includedMealTypes}</p>
            </div>
          </div>
          <ul className={styles["amenities-list"]}>
            {amenities.length > 0 ? (
              amenities.map((amenity, index) => (
                <li key={`amenity-${index + 1}`}>{amenity || "Без опису"}</li>
              ))
            ) : (
              <li>Без опису</li>
            )}
          </ul>
        </div>
      </section>
      <section className={styles["section-footer"]}>
        <div className={styles["season"]}>
          <p className={styles["season-text"]}>{season}</p>
        </div>
        <div className={styles["price"]}>
          <p className={styles["price-text"]}>
            <span className={styles["price-amount"]}>{tourPrice} ₴</span> / за 1
          </p>
          <Button onClick={handleDetailsClick} variant="red">
            Детальніше
          </Button>
        </div>
      </section>
    </article>
  );
};

HotelCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  starRating: PropTypes.number.isRequired,
  averageRating: PropTypes.number,
  reviewCount: PropTypes.number.isRequired,
  isHotDeal: PropTypes.bool.isRequired,
  tourPrice: PropTypes.number.isRequired,
  tourStartDate: PropTypes.string.isRequired,
  tourEndDate: PropTypes.string.isRequired,
  includedMealTypes: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  hotelPhoto: PropTypes.string.isRequired,
};

export default HotelCard;
