import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = () => {
  const location = useLocation();

  // Розбиваємо шлях на сегменти
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Переклад для сегментів
  const segmentTranslations = {
    "about-us": "Про нас",
    countries: "Країни",
    hotels: "Готелі",
    "tour-selection": "Підбір туру",
    "hot-tours": "Гарячі тури",
    "tour-payment": "Як купити і оплатити тур",
    reviews: "Відгуки",
    contacts: "Контакти",
  };

  // Створюємо breadcrumbs для кожного сегмента
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

    // Перевірка, чи сегмент є числом (ID)
    const isIdSegment = !isNaN(segment);

    // Якщо сегмент є ID, то пропускаємо його або змінюємо на інший текст
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
