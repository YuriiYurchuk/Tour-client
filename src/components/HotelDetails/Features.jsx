import { useState } from "react";
import { MButton } from "@components/UI/Button/Button";
import styles from "./Features.module.scss";
import PropTypes from "prop-types";
import ModalMap from "@components/Modal/ModalMap";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Features = ({
  surroundings,
  communication,
  airportDistance,
  latitude,
  longitude,
  beach,
  general,
  activities,
  pools,
  spa,
  service,
  contact,
  kids,
}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <section className={styles["section-features"]}>
      <div>
        <motion.h2
          className={styles["title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceTop}
        >
          Розташування готелю
        </motion.h2>
        <ul className={styles["location-list"]}>
          {surroundings && surroundings.length > 0 && (
            <li>
              <motion.p
                className={styles["location-text"]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceTop}
              >
                Околиці
              </motion.p>
              <ul className={styles["nested-list"]}>
                {surroundings.map((item, index) => (
                  <motion.li
                    key={`surroundings-${index + 1}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={animationsDetails.appearanceLeft}
                    transition={{ delay: index * 0.3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </li>
          )}
          {communication && communication.length > 0 && (
            <li>
              <motion.p
                className={styles["location-text"]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceTop}
              >
                Комунікації
              </motion.p>
              <ul className={styles["nested-list"]}>
                {communication.map((item, index) => (
                  <motion.li
                    key={`communication-${index + 1}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={animationsDetails.appearanceLeft}
                    transition={{ delay: index * 0.3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </li>
          )}
          {airportDistance && airportDistance.length > 0 && (
            <li>
              <motion.p
                className={styles["location-text"]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceTop}
              >
                Відстань від аеропорту
              </motion.p>
              <ul className={styles["nested-list"]}>
                {airportDistance.map((item, index) => (
                  <motion.li
                    key={`airportDistance-${index + 1}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={animationsDetails.appearanceLeft}
                    transition={{ delay: index * 0.3 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </li>
          )}
        </ul>
        <div className="flex justify-center mb-20">
          <MButton
            onClick={() => setIsMapOpen(true)}
            className={styles["map-btn"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceTop}
          >
            Подивитись на карті
          </MButton>
        </div>
      </div>
      {beach && beach.length > 0 && (
        <div>
          <motion.h2
            className={styles["title"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceTop}
          >
            Пляжі
          </motion.h2>
          <div>
            <motion.p
              className={styles["beach-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Пляжі готелю
            </motion.p>
            <ul className={styles["list-beach"]}>
              {beach.map((item, index) => (
                <motion.li
                  key={`beach-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div>
        <motion.h2
          className={styles["title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsDetails.appearanceTop}
        >
          Про готель
        </motion.h2>
        <div className={styles["hotel-info"]}>
          <motion.p
            className={styles["about-text"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceTop}
          >
            Загальне
          </motion.p>
          <ul className={styles["about-list"]}>
            {general.map((item, index) => (
              <motion.li
                key={`general-${index + 1}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceLeft}
                transition={{ delay: index * 0.3 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        {activities && activities.length > 0 && (
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["about-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Спорт та розваги
            </motion.p>
            <ul className={styles["about-list"]}>
              {activities.map((item, index) => (
                <motion.li
                  key={`activities-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {pools && pools.length > 0 && (
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["about-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Басейн
            </motion.p>
            <ul className={styles["about-list"]}>
              {pools.map((item, index) => (
                <motion.li
                  key={`pools-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {spa && spa.length > 0 && (
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["about-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Спа
            </motion.p>
            <ul className={styles["about-list"]}>
              {spa.map((item, index) => (
                <motion.li
                  key={`spa-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {service && service.length > 0 && (
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["about-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              {" "}
              Послуги
            </motion.p>
            <ul className={styles["about-list"]}>
              {service.map((item, index) => (
                <motion.li
                  key={`service-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {contact && contact.length > 0 && (
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["about-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Контакти
            </motion.p>
            <ul className={styles["about-list"]}>
              {contact.map((item, index) => (
                <motion.li
                  key={`contact-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {kids && kids.length > 0 && (
        <div>
          <motion.h2
            className={styles["title"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceTop}
          >
            Для дітей
          </motion.h2>
          <div className={styles["hotel-info"]}>
            <motion.p
              className={styles["kids-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceTop}
            >
              Зручності
            </motion.p>
            <ul className={styles["kids-list"]}>
              {kids.map((item, index) => (
                <motion.li
                  key={`kids-${index + 1}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <ModalMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        coordinates={[latitude, longitude]}
      ></ModalMap>
    </section>
  );
};

Features.propTypes = {
  surroundings: PropTypes.arrayOf(PropTypes.string).isRequired,
  communication: PropTypes.arrayOf(PropTypes.string).isRequired,
  airportDistance: PropTypes.arrayOf(PropTypes.string).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  beach: PropTypes.arrayOf(PropTypes.string).isRequired,
  general: PropTypes.arrayOf(PropTypes.string).isRequired,
  activities: PropTypes.arrayOf(PropTypes.string).isRequired,
  pools: PropTypes.arrayOf(PropTypes.string).isRequired,
  spa: PropTypes.arrayOf(PropTypes.string).isRequired,
  service: PropTypes.arrayOf(PropTypes.string).isRequired,
  contact: PropTypes.arrayOf(PropTypes.string).isRequired,
  kids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Features;
