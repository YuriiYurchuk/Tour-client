import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Countries.module.scss";
import countriesData from "./countriesData";

const countryFlags = import.meta.glob(
  "../../assets/images/Countries-flag/*.webp",
  { eager: true }
);

const getFlag = (country) =>
  countryFlags[`../../assets/images/Countries-flag/${country}.webp`]?.default;

const groupByFirstLetter = (countries) => {
  return countries.reduce((acc, country) => {
    const firstLetter = country.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(country);
    return acc;
  }, {});
};

const groupedCountries = groupByFirstLetter(countriesData);

// Анімація з поступовою появою по індексу
const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Countries = () => {
  const navigate = useNavigate();

  const handleCountryClick = (countryName) => {
    navigate({
      pathname: "/tour-selection",
      search: `?country=${encodeURIComponent(countryName)}&page=1`,
    });
  };

  return (
    <section className="container">
      <h2 className={styles["title"]}>Тури по країнах</h2>
      <section className={styles["container-countries"]}>
        {Object.entries(groupedCountries).map(([letter, countries]) => (
          <div key={letter} className={styles["group"]}>
            <h3 className={styles["letter"]}>{letter}</h3>
            <div className={styles["list"]}>
              {countries.map((country, index) => (
                <motion.button
                  key={country.id}
                  onClick={() => handleCountryClick(country.name)}
                  className={styles["country-card"]}
                  style={{ cursor: "pointer" }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={itemVariant}
                  custom={index}
                >
                  <img
                    src={getFlag(country.flag)}
                    alt={country.name}
                    className={styles.flag}
                  />
                  <div>
                    <p className={styles.name}>{country.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Countries;
