import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import styles from "./Input.module.scss";

const Input = ({
  name,
  control,
  rules,
  type = "text",
  className = "",
  defaultValue = "",
  label = "",
  disabled = false,
  inputClassName = "",
  labelClassName = "",
  placeholder = "",
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

  const inputClasses = `${styles.input} ${inputClassName} ${
    error ? styles["input-error"] : ""
  } ${field.value ? styles["input-filled"] : ""}`;

  const labelClasses = `${styles["input-label"]} ${labelClassName} ${
    field.value ? styles["input-filled"] : ""
  }`;

  const errorContainerClasses = `${styles["error-message-container"]} ${
    error ? styles["show-error"] : ""
  }`;

  return (
    <div className={`${styles["ui-input"]} ${className}`}>
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClasses}
      />
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}
      <div id={`${name}-error`} className={errorContainerClasses}>
        {error?.message}
      </div>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
