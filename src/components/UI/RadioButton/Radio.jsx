import PropTypes from "prop-types";
import styles from "./Radio.module.scss";

const Radio = ({ name, value, label, checked, onChange, disabled = false }) => {
  return (
    <div className={styles["ui-radio"]}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles["radio-input"]}
        tabIndex="0"
      />
      <label htmlFor={value} className={styles["radio-label"]}>
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Radio;
