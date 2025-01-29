import styles from "./Rating.module.scss";
import PropTypes from "prop-types";
import { formatShortMonthDayYear } from "@utils/formatDate";
import { MButton } from "@components/UI/Button/Button";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Rating = ({
  averageRating,
  reviewCount,
  animation,
  beach,
  food,
  price,
  room,
  staff,
  reviews,
}) => {
  return (
    <section className={styles["section-rating"]}>
      <motion.h2
        className={styles["title"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        Рейтинг готелю
      </motion.h2>
      <motion.p
        className={styles["review-info"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        <span className={styles["rating"]}>{averageRating ?? 0}</span>{" "}
        {reviewCount} відгуків
      </motion.p>
      <motion.ul className={styles["rating-list"]}>
        {[
          { value: food, label: "Харчування" },
          { value: room, label: "Кімната" },
          { value: staff, label: "Персонал" },
          { value: price, label: "Ціна-якість" },
          beach > 0 && { value: beach, label: "Пляж" },
          { value: animation, label: "Анімації" },
        ]
          .filter((item) => item)
          .map((item, index) => (
            <motion.li
              key={`${item.value}-${index + 1}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
              transition={{ delay: index * 1 }}
            >
              <span className={styles["rating-value"]}>{item.value}</span>{" "}
              {item.label}
            </motion.li>
          ))}
      </motion.ul>
      <motion.div
        className={styles["reviews-container"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        {reviews.map((review) => (
          <article className={styles["review"]} key={review.id}>
            <header className={styles["review-header"]}>
              <div className="flex items-center">
                <p className={styles["review-rating"]}>{review.rating}</p>
                <p className={styles["review-user"]}>
                  {review.user.first_name}
                </p>
              </div>
              <time className={styles["review-date"]}>
                {formatShortMonthDayYear(review.created_at)}
              </time>
            </header>
            <p className={styles["comment"]}>{review.comment}</p>
          </article>
        ))}
      </motion.div>
      <motion.div
        className="flex justify-center mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        {reviews.length === 0 ? (
          <p className={styles["no-reviews-message"]}>
            Новий готель, відгуків немає
          </p>
        ) : (
          <MButton className={styles["reviews-btn"]}>
            Показати всі відгуки
          </MButton>
        )}
      </motion.div>
    </section>
  );
};

Rating.propTypes = {
  averageRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  animation: PropTypes.number.isRequired,
  beach: PropTypes.number.isRequired,
  food: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  staff: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      user: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
      }).isRequired,
      created_at: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Rating;
