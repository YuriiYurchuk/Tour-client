import PropTypes from "prop-types";
import { useState } from "react";
import { useController } from "react-hook-form";
import styles from "./DropdownWithInput.module.scss";

const DropdownWithInput = ({
  name,
  control,
  rules,
  options,
  label,
  type = "text",
  disabled = false,
  className,
  defaultValue = "",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleChange = (e) => {
    const value = e.target.value;
    field.onChange(value);
    filterOptions(value);
  };

  const handleSelect = (option) => {
    field.onChange(option);
    setIsOpen(false);
  };

  const filterOptions = (value) => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className={`${styles["ui-dropdown"]} ${className}`}>
      <input
        {...field}
        id={name}
        type={type}
        placeholder=" "
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onChange={handleChange}
        className={`${styles.input} ${error ? styles["input-error"] : ""} ${
          field.value ? styles["input-filled"] : ""
        }`}
      />
      <label
        htmlFor={name}
        className={`${styles["input-label"]} ${
          field.value ? styles["input-filled"] : ""
        }`}
      >
        {label}
      </label>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li key={option} className={styles["dropdown-item"]}>
                <button
                  type="button"
                  className={styles["dropdown-button"]}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))
          ) : (
            <li className={styles["dropdown-item"]}>
              <button
                type="button"
                className={styles["dropdown-button"]}
                disabled
              >
                Значення немає
              </button>
            </li>
          )}
        </ul>
      )}
      {error && (
        <p id={`${name}-error`} className={styles["error-message"]}>
          {error.message}
        </p>
      )}
    </div>
  );
};

DropdownWithInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DropdownWithInput;
