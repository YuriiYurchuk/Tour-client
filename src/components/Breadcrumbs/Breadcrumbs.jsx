import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const segmentTranslations = {
    "about-us": "Про нас",
    countries: "Країни",
    hotels: "Готелі",
    "tour-selection": "Підбір туру",
    "hot-tours": "Гарячі тури",
    "tour-payment": "Як купити і оплатити тур",
    reviews: "Відгуки",
    contacts: "Контакти",
    profile: "Профіль",
  };

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

    const isIdSegment = !isNaN(segment);

    const label = isIdSegment ? "" : segmentTranslations[segment] || segment;

    const isActive = location.pathname === path;

    return (
      <motion.li
        key={path}
        className={`breadcrumb-item ${isActive ? "active" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2, duration: 1 }}
      >
        {label && (
          <>
            <Link
              to={path}
              className={
                isActive ? styles["active-link"] : styles["inactive-link"]
              }
            >
              {label}
            </Link>
            {index < pathSegments.length - 1 && (
              <span className={styles.slash}> / {""}</span>
            )}
          </>
        )}
      </motion.li>
    );
  });

  return (
    <nav className="container" aria-label="breadcrumb">
      <motion.ul
        className={styles["breadcrumb"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.li
          className="breadcrumb-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? styles["active-link"]
                : styles["inactive-link"]
            }
          >
            Головна
          </Link>
          <span className={styles.slash}> / {""}</span>
        </motion.li>
        {breadcrumbs}
      </motion.ul>
    </nav>
  );
};

export default Breadcrumbs;
