import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "@components/UI/Modal/Modal";
import Radio from "@components/UI/RadioButton/Radio";
import styles from "./ModalFilter.module.scss";

const FILTER_OPTIONS = {
  SEASONS: [
    { id: "Summer", label: "Літо" },
    { id: "Winter", label: "Зима" },
    { id: "Spring", label: "Весна" },
    { id: "Autumn", label: "Осінь" },
  ],
  STAR_RATINGS: [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ],
  MEAL_TYPES: [
    { id: "breakfast", label: "Сніданок" },
    { id: "dinner", label: "Вечеря" },
    { id: "lunch", label: "Обід" },
    { id: "all_inclusive", label: "Все включено" },
  ],
  AMENITIES: [
    { id: "wifi", label: "WiFi" },
    { id: "Басейн", label: "Pool" },
    { id: "spa", label: "Spa" },
    { id: "gym", label: "Gym" },
    { id: "restaurant", label: "Restaurant" },
    { id: "parking", label: "Parking" },
  ],
};

const filterShape = PropTypes.shape({
  season: PropTypes.string,
  starRating: PropTypes.number,
  mealType: PropTypes.string,
  country: PropTypes.string,
  amenities: PropTypes.string,
  priceFrom: PropTypes.number,
  priceTo: PropTypes.number,
});

const ModalFilter = ({ isOpen, onClose, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    season: filters.season || "",
    starRating: filters.starRating || null,
    mealType: filters.mealType || "",
    country: filters.country || "",
    amenities: filters.amenities || "",
    priceFrom: filters.priceFrom ?? 2000,
    priceTo: filters.priceTo ?? 80000,
  });
  const [rangeStyle, setRangeStyle] = useState({});

  const handleInputChange = (key, value) => {
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleRangeChange = (key, value) => {
    setLocalFilters((prevFilters) => {
      const newValue = parseInt(value, 10);
      if (key === "priceFrom") {
        return {
          ...prevFilters,
          priceFrom: Math.min(newValue, prevFilters.priceTo),
        };
      } else if (key === "priceTo") {
        return {
          ...prevFilters,
          priceTo: Math.max(newValue, prevFilters.priceFrom),
        };
      }
      return prevFilters;
    });
  };

  useEffect(() => {
    const minVal = parseInt(localFilters.priceFrom || 0, 10);
    const maxVal = parseInt(localFilters.priceTo || 100000, 10);
    const percentageMin = (minVal / 100000) * 100;
    const percentageMax = (maxVal / 100000) * 100;

    setRangeStyle({
      background: `linear-gradient(to right, #d3d3d3 ${percentageMin}%, #463998 ${percentageMin}%, #463998 ${percentageMax}%, #d3d3d3 ${percentageMax}%)`,
    });
  }, [localFilters.priceFrom, localFilters.priceTo]);

  const handleAmenitiesChange = (amenityId) => {
    const currentAmenities = localFilters.amenities
      ? localFilters.amenities.split(",").filter(Boolean)
      : [];

    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((item) => item !== amenityId)
      : [...currentAmenities, amenityId];

    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      amenities: updatedAmenities.join(","),
    }));
  };

  const resetFilters = () => {
    setLocalFilters({
      season: "",
      starRating: null,
      mealType: "",
      country: "",
      amenities: "",
      priceFrom: 2000,
      priceTo: 80000,
    });
  };

  const applyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...localFilters,
      page: 1,
    }));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={styles["modal-filter"]}
      overlayClassName={styles["overlay-filter"]}
      contentClassName={styles["content-filter"]}
    >
      <div className={styles["filter-container"]}>
        <h2>Фільтри</h2>
        <div className={styles["filter-content"]}>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Сезон</p>
            <div className={styles["filter-radio"]}>
              {FILTER_OPTIONS.SEASONS.map(({ id, label }) => (
                <Radio
                  key={id}
                  name="season"
                  value={id}
                  label={label}
                  checked={localFilters.season === id}
                  onChange={() => handleInputChange("season", id)}
                />
              ))}
            </div>
          </div>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Рейтинг готелю</p>
            <div className={styles["filter-radio"]}>
              {FILTER_OPTIONS.STAR_RATINGS.map(({ id, label }) => (
                <Radio
                  key={id}
                  name="starRating"
                  value={id}
                  label={label}
                  checked={localFilters.starRating === id}
                  onChange={() => handleInputChange("starRating", id)}
                />
              ))}
            </div>
          </div>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Харчування</p>
            <div className={styles["filter-radio"]}>
              {FILTER_OPTIONS.MEAL_TYPES.map(({ id, label }) => (
                <Radio
                  key={id}
                  name="mealType"
                  value={id}
                  label={label}
                  checked={localFilters.mealType === id}
                  onChange={() => handleInputChange("mealType", id)}
                />
              ))}
            </div>
          </div>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Країна</p>
            <input
              type="text"
              id="country"
              value={localFilters.country || ""}
              className={styles["filter-input"]}
              onChange={(e) => handleInputChange("country", e.target.value)}
              placeholder="Введіть країну"
            />
          </div>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Ціна</p>
            <div className={styles["range-slider"]}>
              <span
                className={styles["slider-track"]}
                style={rangeStyle}
              ></span>
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                className={styles["min-val"]}
                value={localFilters.priceFrom || 0}
                onChange={(e) => handleRangeChange("priceFrom", e.target.value)}
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="100"
                className={styles["max-val"]}
                value={localFilters.priceTo || ""}
                onChange={(e) => handleRangeChange("priceTo", e.target.value)}
              />
              <div
                className={`${styles["tooltip"]} ${styles["min-tooltip"]}`}
                style={{ left: `${(localFilters.priceFrom / 100000) * 100}%` }}
              >
                {localFilters.priceFrom} ₴
              </div>
              <div
                className={`${styles["tooltip"]} ${styles["max-tooltip"]}`}
                style={{ left: `${(localFilters.priceTo / 100000) * 100}%` }}
              >
                {localFilters.priceTo} ₴
              </div>
            </div>
            <div className={styles["input-box-range"]}>
              <div className={styles["price-input-container"]}>
                <span className={styles["currency-symbol"]}>Від ₴</span>
                <input
                  type="text"
                  id="priceFrom"
                  value={localFilters.priceFrom || 0}
                  onChange={(e) =>
                    handleRangeChange("priceFrom", e.target.value)
                  }
                  placeholder="Мінімальна ціна"
                  className={styles["price-input"]}
                />
              </div>
              <div className={styles["price-input-container"]}>
                <span className={styles["currency-symbol"]}>до ₴</span>
                <input
                  type="text"
                  id="priceTo"
                  value={localFilters.priceTo || ""}
                  onChange={(e) => handleRangeChange("priceTo", e.target.value)}
                  placeholder="Максимальна ціна"
                  className={styles["price-input"]}
                />
              </div>
            </div>
          </div>
          <div className={styles["filter-group"]}>
            <p className={styles["filter-title"]}>Зручності</p>
            {FILTER_OPTIONS.AMENITIES.map(({ id, label }) => (
              <div key={id} className={styles["checkbox-container"]}>
                <label className={styles["custom-checkbox"]}>
                  <input
                    type="checkbox"
                    checked={localFilters.amenities?.split(",").includes(id)}
                    onChange={() => handleAmenitiesChange(id)}
                  />
                  <span className={styles["checkbox-mark"]}></span>
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles["filter-actions"]}>
          <button className={styles["reset-button"]} onClick={resetFilters}>
            Очистити
          </button>
          <button className={styles["apply-button"]} onClick={applyFilters}>
            Застосувати <span className={styles["arrow"]}></span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

ModalFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: filterShape.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ModalFilter;
