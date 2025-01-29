import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Loader.module.scss";

const Loader = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    shouldRender && (
      <div
        className={`${styles["loader-container"]} ${
          isLoading ? styles["fade-in"] : styles["fade-out"]
        }`}
      >
        <div className={styles["loader"]}>
          <div className={styles["loader-dot"]}></div>
          <div className={styles["loader-dot"]}></div>
          <div className={styles["loader-dot"]}></div>
        </div>
      </div>
    )
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
