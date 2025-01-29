import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";

const Button = forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "gray",
      disabled = false,
      className = "",
    },
    ref
  ) => {
    const classNames = [
      styles["ui-button"],
      styles[`ui-button--${variant}`],
      disabled && styles["ui-button--disabled"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        <span className={styles["ui-button__text"]}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["gray", "red"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
export const MButton = motion.create(Button);
MButton.displayName = "MButton";
