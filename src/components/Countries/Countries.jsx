import { useNavigate } from "react-router-dom";
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
              {countries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country.name)}
                  className={styles["country-card"]}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={getFlag(country.flag)}
                    alt={country.name}
                    className={styles.flag}
                  />
                  <div>
                    <p className={styles.name}>{country.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Countries;
