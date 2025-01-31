import { useState } from "react";
import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

const ModalTourist = ({ isOpen, onClose, onTouristSelect }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [ages, setAges] = useState([]);

  const handleConfirm = () => {
    if (children > 0 && ages.some((age) => age === "" || age === null)) return;
    onTouristSelect({ adults, children, ages });
    onClose();
  };

  const handleChildrenChange = (newCount) => {
    setChildren(newCount);
    if (newCount > children) {
      setAges([...ages, ""]);
    } else {
      setAges(ages.slice(0, newCount));
    }
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...ages];
    newAges[index] = value;
    setAges(newAges);
  };

  const isConfirmDisabled =
    children > 0 && ages.some((age) => age === "" || age === null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName={styles["overlay"]}
      modalClassName={styles["modal-tourist"]}
      contentClassName={styles["content-tourist"]}
    >
      <div className={styles["tourist"]}>
        <div className={styles["counter"]}>
          <p>Дорослі</p>
          <div className={styles["controls"]}>
            <button onClick={() => setAdults(Math.max(1, adults - 1))}>
              -
            </button>
            <span>{adults}</span>
            <button onClick={() => setAdults(adults + 1)}>+</button>
          </div>
        </div>
        <div className={styles["counter"]}>
          <p>Діти</p>
          <div className={styles["controls"]}>
            <button
              onClick={() => handleChildrenChange(Math.max(0, children - 1))}
            >
              -
            </button>
            <span>{children}</span>
            <button onClick={() => handleChildrenChange(children + 1)}>
              +
            </button>
          </div>
        </div>
      </div>
      {children > 0 && (
        <div className="mt-5 flex gap-2 flex-wrap">
          {ages.map((age, index) => (
            <input
              key={`age-${index + 1}`}
              type="number"
              min="0"
              max="17"
              value={age}
              onChange={(e) => handleAgeChange(index, e.target.value)}
              placeholder={`Вік дитини ${index + 1}`}
              className={styles["age-input"]}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-5">
        <button
          className={`uppercase bg-stone-900 text-white py-2 px-4 rounded-3xl disabled:opacity-50 hover:bg-stone-700 transition-colors duration-300 ${
            isConfirmDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
        >
          Підтвердити
        </button>
      </div>
    </Modal>
  );
};

ModalTourist.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTouristSelect: PropTypes.func.isRequired,
};

export default ModalTourist;
