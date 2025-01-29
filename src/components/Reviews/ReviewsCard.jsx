import PropTypes from "prop-types";
import styles from "./ReviewsCard.module.scss";
import filledStar from "../../assets/images/filled-star-icon.svg";
import emptyStar from "../../assets/images/empty-star-icon.svg";

const ReviewsCard = ({
  userPhoto,
  starRating,
  firstName,
  city,
  hotelName,
  comment,
}) => {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <img
        key={index}
        src={index < rating ? filledStar : emptyStar}
        alt={index < rating ? "Заповнена зірка" : "Порожня зірка"}
        className={styles.star}
      />
    ));

  return (
    <article className={styles["card"]}>
      <img src={userPhoto} alt={firstName} className={styles["photo"]} />
      <div className={styles["stars"]}>{renderStars(starRating)}</div>
      <h3>{firstName}</h3>
      <h3>
        {city}, готель {hotelName}
      </h3>
      <p className={styles["comment"]}>{comment}</p>
    </article>
  );
};

ReviewsCard.propTypes = {
  userPhoto: PropTypes.string.isRequired,
  starRating: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  hotelName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default ReviewsCard;
