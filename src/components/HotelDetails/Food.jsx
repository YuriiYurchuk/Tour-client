import styles from "./Food.module.scss";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Food = ({
  restaurants,
  mealTypes,
  activeMealType,
  setActiveMealType,
}) => {
  return (
    <section className={styles["section-food"]}>
      <motion.h2
        className={styles["heading"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        Харчування
      </motion.h2>
      <div>
        <motion.p
          className={styles["subheading"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceTop}
        >
          Ресторани
        </motion.p>
        <ul className={styles["restaurants-list"]}>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <motion.li
                key={`restaurant-${index + 1}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceLeft}
                transition={{ delay: index * 0.3 }}
              >
                {restaurant}
              </motion.li>
            ))
          ) : (
            <li>Ресторани в готелі відсутні</li>
          )}
        </ul>
      </div>
      <div className={styles["food-container"]}>
        {mealTypes.map((meal) => (
          <motion.article
            key={meal.id}
            className={styles["food"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceLeft}
          >
            <div>
              <h4>{meal.type_name}</h4>
              <ul className={styles["food-list"]}>
                {meal.description.map((descriptions, index) => (
                  <li key={`descriptions-${index + 1}`}>{descriptions}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveMealType(meal.id)}
                className={
                  activeMealType === meal.id
                    ? styles["active-button"]
                    : styles["inactive-button"]
                }
              >
                {activeMealType === meal.id ? "Обрано" : "Обрати"}
              </button>
              <p className={styles["price"]}>
                {meal.price && meal.price > 0 ? `+ ${meal.price} ₴` : "в ціні"}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

Food.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.string).isRequired,
  mealTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type_name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  activeMealType: PropTypes.string,
  setActiveMealType: PropTypes.func.isRequired,
};

export default Food;
