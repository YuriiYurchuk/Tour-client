import styles from "./Description.module.scss";
import PropTypes from "prop-types";
import star from "../../assets/images/filled-star-icon.svg";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Description = ({
  country,
  city,
  name,
  starRating,
  averageRating,
  reviewCount,
  tourPrice,
  description,
  amenities,
}) => {
  const stars = Array(starRating).fill(true);

  return (
    <section className={styles["section-description"]}>
      <div className={styles["description-desktop"]}>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceLeft}
        >
          {country}, {city}
        </motion.p>
        <motion.h4
          className={styles["hotel-name"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceLeft}
        >
          {name}
        </motion.h4>
        <div className="flex gap-3 items-center mb-7">
          <motion.div
            className={styles["star-rating"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceTop}
          >
            {stars.map((_, index) => (
              <img key={`star-${index + 1}`} src={star} alt="Star" />
            ))}
          </motion.div>
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
        </div>
        <motion.p
          className={styles["price-text"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceLeft}
        >
          <span className={styles["price-amount"]}>{tourPrice} ₴</span> / за 1
          людину
        </motion.p>
      </div>
      <motion.h4
        className={styles["title"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        Чому варто обрати цей готель
      </motion.h4>
      <motion.p
        className={styles["description"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceLeft}
      >
        {description}
      </motion.p>
      <ul className={styles["amenities-list"]}>
        {amenities.length > 0 ? (
          amenities.map((amenity, index) => (
            <motion.li
              key={`amenity-${index + 1}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceLeft}
              transition={{ delay: index * 0.3 }}
            >
              {amenity || "Без опису"}
            </motion.li>
          ))
        ) : (
          <li>Без опису</li>
        )}
      </ul>
    </section>
  );
};

Description.propTypes = {
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  starRating: PropTypes.number.isRequired,
  averageRating: PropTypes.number,
  reviewCount: PropTypes.number.isRequired,
  tourPrice: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Description;
